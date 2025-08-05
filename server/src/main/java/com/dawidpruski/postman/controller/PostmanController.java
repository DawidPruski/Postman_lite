package com.dawidpruski.postman.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.dto.RequestDTO;
import com.dawidpruski.postman.model.RequestResponseHistory;
import com.dawidpruski.postman.service.MongoDBService;
import com.dawidpruski.postman.service.PostmanService;

@RestController
@RequestMapping(value = "/api")
public class PostmanController {

    private final MongoDBService mongoDBService;
    private final PostmanService postmanService;

    public PostmanController(MongoDBService mongoDBService, PostmanService postmanService) {
        this.mongoDBService = mongoDBService;
        this.postmanService = postmanService;
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

    @GetMapping(value = "/history")
    public ResponseEntity<List<RequestResponseHistory>> getHistory() {
        List<RequestResponseHistory> response = mongoDBService.returnRequestResponseHistory();
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/send")
    public ResponseEntity<Object> sendApiRequest(@RequestBody RequestDTO request) {
        return postmanService.sendRequestAndSaveHistory(request);
    }
}