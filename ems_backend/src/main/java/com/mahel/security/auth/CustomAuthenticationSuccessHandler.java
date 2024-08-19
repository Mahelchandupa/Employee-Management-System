package com.mahel.security.auth;

import com.mahel.security.entity.Employee;
import com.mahel.security.repository.EmployeeRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public CustomAuthenticationSuccessHandler(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        String email = authentication.getName();
        Employee employee = employeeRepository.findByEmail(email);

        if (employee != null && employee.isFirstAttempt()) {
            response.setHeader("redirect-url","/reset-password");
        }
        else {
            response.setHeader( "redirect-url", "/");
        }
    }
}
