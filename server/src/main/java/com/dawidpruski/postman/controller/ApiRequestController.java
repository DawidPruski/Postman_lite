package com.dawidpruski.postman.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawidpruski.postman.dto.api.ApiRequestDto;
import com.dawidpruski.postman.model.RequestResponseHistory;
import com.dawidpruski.postman.repository.RequestResponseRepository;
import com.dawidpruski.postman.service.ApiRequestService;

@RestController
@RequestMapping(value = "/api/requests")
public class ApiRequestController {

    private final ApiRequestService apiRequestService;
    private final RequestResponseRepository requestResponseRepository;

    public ApiRequestController(ApiRequestService apiRequestService,
            RequestResponseRepository requestResponseRepository) {
        this.apiRequestService = apiRequestService;
        this.requestResponseRepository = requestResponseRepository;
    }

    @GetMapping(value = "/history")
    public ResponseEntity<List<RequestResponseHistory>> getHistory() {
        List<RequestResponseHistory> response = requestResponseRepository.findAll();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<RequestResponseHistory> getRequest(@PathVariable Long id) {
        RequestResponseHistory result = requestResponseRepository.findById(id).orElse(null);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/send")
    public ResponseEntity<Object> sendApiRequest(@RequestBody ApiRequestDto request,
            @RequestHeader(value = "Authorization", required = true) String authorization) {
        var response = apiRequestService.sendRequestAndSaveHistory(request, authorization);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
