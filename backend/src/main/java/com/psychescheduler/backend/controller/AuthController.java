package com.psychescheduler.backend.controller;

import com.psychescheduler.backend.dto.auth.AuthResponse;
import com.psychescheduler.backend.dto.auth.LoginRequest;
import com.psychescheduler.backend.dto.auth.RegisterRequest;
import com.psychescheduler.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(
            @RequestBody RegisterRequest request
    ){
        authService.register(request);
        return ResponseEntity.ok().build();


    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ){
        return ResponseEntity.ok(authService.login(request));
    }
}
