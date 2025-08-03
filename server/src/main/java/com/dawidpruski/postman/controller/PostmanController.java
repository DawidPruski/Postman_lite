package com.dawidpruski.postman.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.dto.RequestDTO;
import com.dawidpruski.postman.dto.ResponseDTO;
import com.dawidpruski.postman.service.MongoDBService;
import com.dawidpruski.postman.service.RequestService;

@RestController
@RequestMapping(value = "/api")
public class PostmanController {

    private final MongoDBService mongoDBService;
    private final RequestService requestService;

    public PostmanController(MongoDBService mongoDBService, RequestService requestService) {
        this.mongoDBService = mongoDBService;
        this.requestService = requestService;
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

    @PostMapping(value = "/send")
    public ResponseEntity<ResponseDTO> sendApiRequest(@RequestBody RequestDTO request) {
        ResponseDTO response = requestService.executeRequest(request);
        return ResponseEntity.ok(response);
    }
}