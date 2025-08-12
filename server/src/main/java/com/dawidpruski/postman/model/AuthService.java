package com.dawidpruski.postman.model;

import org.springframework.data.annotation.Id;

public class AuthService {

    @Id
    String userName;
    String password;
}
