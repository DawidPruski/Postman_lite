package com.dawidpruski.postman.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.dto.RequestDTO;

@RestController
@RequestMapping(value = "/api")
public class PostmanController {

    public PostmanController() {
    }

    @GetMapping(value = "/info")
    public ResponseEntity<String> returnApplicationData() {
        return ResponseEntity.ok("<h1>PostmanLite<h1>");
    }

    @PostMapping(value = "/send")
    public ResponseEntity<RequestDTO> sendApiRequest(@RequestBody RequestDTO request) {
        return ResponseEntity.ok(request);
    }
}