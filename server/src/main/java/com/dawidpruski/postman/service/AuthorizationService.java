package com.dawidpruski.postman.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dawidpruski.postman.dto.ResponseDto;
import com.dawidpruski.postman.dto.auth.LoginResponseDto;
import com.dawidpruski.postman.model.User;
import com.dawidpruski.postman.repository.UserRepository;

@Service
public class AuthorizationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthorizationService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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
            String token = jwtService.generateToken(userName);
            return new LoginResponseDto(200, "Login successful", token);
        } else {
            return new LoginResponseDto(401, "Incorrect credentials or user doesn't exists!", null);
        }
    }

    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
