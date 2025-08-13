package com.dawidpruski.postman.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dawidpruski.postman.dto.ResponseDto;
import com.dawidpruski.postman.dto.auth.LoginResponseDto;
import com.dawidpruski.postman.model.User;
import com.dawidpruski.postman.repository.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class AuthorizationService {
    private final String secretKey;
    private final long expirationMs = 3600000;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthorizationService(@Value("${jwt.secret}") String secretKey, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.secretKey = secretKey;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseDto authorizeRegister(String userName, String password) {
        String encryptedPassword = hashPassword(password);
        var result = userRepository.findByUserName(userName).orElse(null);
        if (result == null) {
            User user = new User(userName, encryptedPassword);
            userRepository.save(user);
            return new ResponseDto(201, "User registered!");
        } else {
            return new ResponseDto(409, "User is already registered");
        }
    }

    public LoginResponseDto authorizeLogin(String userName, String password) {
        var result = userRepository.findByUserName(userName).orElse(null);
        if (result != null && passwordEncoder.matches(password, result.getPassword())) {
            String token = generateToken(userName);
            return new LoginResponseDto(200, "Login successful", token);
        } else {
            return new LoginResponseDto(401, "Incorrect credentials or user doesn't exists!", null);
        }
    }

    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(getSigningKey())
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
