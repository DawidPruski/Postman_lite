package com.dawidpruski.postman.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dawidpruski.postman.dto.RequestDTO;
import com.dawidpruski.postman.dto.ResponseDTO;
import com.dawidpruski.postman.model.RequestResponseHistory;

@Service
public class PostmanService {

    private final RestClientService restClientService;
    private final MongoDBService mongoDBService;

    public PostmanService(MongoDBService mongoDBService, RestClientService restClientService) {
        this.restClientService = restClientService;
        this.mongoDBService = mongoDBService;
    }

    public ResponseEntity<Object> sendRequestAndSaveHistory(RequestDTO request) {
        long startTime = System.currentTimeMillis();
        var response = restClientService.executeRequest(request.method().toUpperCase(), request.url(),
                request.body());
        long responseTime = System.currentTimeMillis() - startTime;

        RequestDTO requestDTO = new RequestDTO(request.url(), request.method(), request.headers(),
                request.body());

        ResponseDTO responseDTO = new ResponseDTO(request.url(), request.method(), response.getHeaders(),
                response.getBody(), response.getStatusCode().value(),
                response.getStatusCode().toString(), responseTime);

        RequestResponseHistory requestResponseHistory = new RequestResponseHistory(requestDTO, responseDTO);
        mongoDBService.createRequestHistory(requestResponseHistory);

        return response;
    }
}
