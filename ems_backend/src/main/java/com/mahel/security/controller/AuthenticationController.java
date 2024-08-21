package com.mahel.security.controller;

import com.mahel.security.auth.AuthenticationService;
import com.mahel.security.dto.auth.RegisterRequest;
import com.mahel.security.dto.auth.AuthenticationRequest;
import com.mahel.security.dto.auth.AuthenticationResponse;
import com.mahel.security.dto.auth.VerificationRequest;
import com.mahel.security.service.exception.BadCredentialsException;
import com.mahel.security.service.exception.RecordNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<?> register(
      @RequestBody RegisterRequest request
  ) {

    var response = service.register(request);
    if (request.isMfaEnabled()) {
      return ResponseEntity.ok(response);
    }
    return ResponseEntity.accepted().build();
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) throws RecordNotFoundException, BadCredentialsException {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }

  @PostMapping("/enable-2fa")
  public ResponseEntity<AuthenticationResponse> enable2FA(
          @RequestParam String email
  ) throws RecordNotFoundException {
    var response = service.enable2FA(email);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/verify")
  public ResponseEntity<?> verifyCode(
          @RequestBody VerificationRequest verificationRequest
  ) throws RecordNotFoundException, BadCredentialsException {
    return ResponseEntity.ok(service.verifyCode(verificationRequest));
  }

}
