package com.mahel.security.controller;

import com.mahel.security.dto.ResponseDTO;
import com.mahel.security.dto.auth.ChangePasswordRequest;
import com.mahel.security.service.UserService;
import com.mahel.security.service.exception.IllegalStateException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PatchMapping("/reset-password")
    public ResponseEntity<ResponseDTO> changePassword(
          @RequestBody ChangePasswordRequest request,
          Principal connectedUser
    ) throws IllegalStateException {
        ResponseDTO res =  service.changePassword(request, connectedUser);
        return ResponseEntity.ok(res);
    }
}
