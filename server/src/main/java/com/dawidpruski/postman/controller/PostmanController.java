package com.dawidpruski.postman.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.service.MongoDBService;
import com.dawidpruski.postman.service.ApiRequestService;

@RestController
@RequestMapping(value = "/api")
// TODO: Delete this controller / move endpoints
public class PostmanController {

    private final MongoDBService mongoDBService;

    public PostmanController(MongoDBService mongoDBService, ApiRequestService ApiRequestService) {
        this.mongoDBService = mongoDBService;
    }

    @GetMapping(value = "/info")
    public ResponseEntity<String> returnApplicationData() {
        return ResponseEntity.ok("<h1>PostmanLite<h1>");
    }

    @GetMapping(value = "/test-db")
    public ResponseEntity<String> returnDBInfo() {
        String dbTestMessage = mongoDBService.testConnection();
        return ResponseEntity.ok(dbTestMessage);
    }

}