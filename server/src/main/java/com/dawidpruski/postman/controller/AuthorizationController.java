package com.dawidpruski.postman.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.dto.ResponseDto;
import com.dawidpruski.postman.dto.auth.LoginDto;
import com.dawidpruski.postman.dto.auth.LoginResponseDto;
import com.dawidpruski.postman.dto.auth.RegisterDto;
import com.dawidpruski.postman.service.AuthorizationService;

@RestController
@RequestMapping(value = "api/auth")
public class AuthorizationController {

    private final AuthorizationService authorizationService;

    public AuthorizationController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<ResponseDto> register(@RequestBody RegisterDto registerDto) {
        var response = authorizationService.authorizeRegister(registerDto.userName(), registerDto.password());
        return ResponseEntity.status(response.status()).body(response);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
        var response = authorizationService.authorizeLogin(loginDto.username(), loginDto.password());
        return ResponseEntity.status(response.status()).body(response);
    }
}
