package com.dawidpruski.postman.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.security.SecureRandom;
import java.security.spec.KeySpec;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dawidpruski.postman.model.User;
import com.dawidpruski.postman.repository.UserRepository;

@Service
public class AuthorizationService {

    private final UserRepository userRepository;

    public AuthorizationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<Object> authorizeRegister(String userName, String password) {
        String encryptedPassword = hashPassword(password);
        var result = userRepository.findByUserName(userName).orElse(null);
        if (result == null) {
            User user = new User(userName, encryptedPassword);
            userRepository.save(user);
            return ResponseEntity.status(201).body("User registered");
        } else {
            return ResponseEntity.status(409).body("User is already registered");
        }
    }

    public String authorizeLogin(String userName, String password) {
        // TODO
        return "Login Successful";
    }

    private String hashPassword(String password) {
        try {
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);
            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    }

    private String getToken() {
        // TODO
        return "token";
    }
}
