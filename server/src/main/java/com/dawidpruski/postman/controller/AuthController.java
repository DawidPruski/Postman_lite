package com.dawidpruski.postman.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.dto.auth.LoginDto;

@RestController
@RequestMapping(value = "api/auth")
public class AuthController {

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        // TODO: implement authentication logic using loginDto
        return ResponseEntity.ok("Login successful");
    }
}
