package com.mahel.security.service;

import com.mahel.security.dto.auth.ChangePasswordRequest;
import com.mahel.security.entity.Employee;
import com.mahel.security.entity.User;
import com.mahel.security.repository.EmployeeRepository;
import com.mahel.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final EmployeeRepository employeeRepository;

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        Employee employee = employeeRepository.findByEmail(user.getEmail());

        // update the password
        employee.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        employeeRepository.save(employee);
        repository.save(user);
    }
}