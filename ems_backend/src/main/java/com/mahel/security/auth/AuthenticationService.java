package com.mahel.security.auth;

import com.mahel.security.config.JwtService;
import com.mahel.security.dto.auth.AuthenticationRequest;
import com.mahel.security.dto.auth.AuthenticationResponse;
import com.mahel.security.dto.auth.RegisterRequest;
import com.mahel.security.dto.auth.VerificationRequest;
import com.mahel.security.entity.Token;
import com.mahel.security.repository.TokenRepository;
import com.mahel.security.entity.enums.TokenType;
import com.mahel.security.entity.User;
import com.mahel.security.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mahel.security.service.exception.BadCredentialsException;
import com.mahel.security.service.exception.RecordNotFoundException;
import com.mahel.security.tfa.TwoFactorAuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final TwoFactorAuthenticationService tfaService;

  public AuthenticationResponse register(RegisterRequest request) {
    var user = User.builder()
        .firstname(request.getFirstname())
        .lastname(request.getLastname())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(request.getRole())
            .firstAttempt(true)
//            .mfaEnabled(request.isMfaEnabled())
        .build();

//    if (request.isMfaEnabled()) {
//      user.setSecret(tfaService.generateNewSecret());
//    }
    var savedUser = repository.save(user);
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
//            .secretImageUri(tfaService.generateQrCodeImageUri(user.getSecret()))
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
//            .mfaEnabled(user.isMfaEnabled())
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) throws BadCredentialsException, RecordNotFoundException {
    try {
      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                      request.getEmail(),
                      request.getPassword()
              )
      );
    } catch (AuthenticationException ex) {
      throw new BadCredentialsException("Invalid email or password");
    }

    var user = repository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RecordNotFoundException("User not found"));
    if (user.isMfaEnabled()) {
      return AuthenticationResponse.builder()
              .accessToken("")
              .refreshToken("")
              .mfaEnabled(true)
              .build();
    }
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);

    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .mfaEnabled(false)
            .firstAttempt(user.isFirstAttempt())
            .firstName(user.getFirstname())
            .lastName(user.getLastname())
            .email(user.getEmail())
            .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .mfaEnabled(false)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }

  public AuthenticationResponse enable2FA(String email) throws RecordNotFoundException {
    var user = repository.findByEmail(email)
            .orElseThrow(() -> new RecordNotFoundException("User not found"));

    if (user.isMfaEnabled()) {
      throw new IllegalStateException("2FA is already enabled for this user");
    }

    user.setSecret(tfaService.generateNewSecret());
    user.setMfaEnabled(true);
    repository.save(user);

    return AuthenticationResponse.builder()
            .secretImageUri(tfaService.generateQrCodeImageUri(user.getSecret()))
            .accessToken("")
            .refreshToken("")
            .mfaEnabled(true)
            .build();
  }

  public Object verifyCode(VerificationRequest verificationRequest) throws RecordNotFoundException, BadCredentialsException {
     User user = repository.findByEmail(verificationRequest.getEmail())
             .orElseThrow(() -> new RecordNotFoundException("No user found"));
     if (tfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {
       throw new BadCredentialsException("Code is not correct");
     }
     var jwtToken = jwtService.generateToken(user);
     var refreshToken = jwtService.generateRefreshToken(user);
     revokeAllUserTokens(user);
     saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
             .accessToken(jwtToken)
             .refreshToken(refreshToken)
             .mfaEnabled(user.isMfaEnabled())
             .firstAttempt(user.isFirstAttempt())
             .build();
  }
}
