package com.dawidpruski.postman.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class PostmanController {

    @GetMapping(value = "/info")
    public ResponseEntity<String> returnApplicationData() {
        return ResponseEntity.ok("<h1>HelloWorld<h1>");
    }
}