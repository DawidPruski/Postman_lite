package com.dawidpruski.postman.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.dto.auth.LoginDto;
import com.dawidpruski.postman.service.AuthorizationService;

@RestController
@RequestMapping(value = "api/auth")
public class AuthorizationController {

    private final AuthorizationService authorizationService;

    public AuthorizationController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        // TODO: implement authentication logic using loginDto
        var response = authorizationService.authorizeLogin(loginDto.username(), loginDto.password());
        return ResponseEntity.ok("Login successful");
    }
}
