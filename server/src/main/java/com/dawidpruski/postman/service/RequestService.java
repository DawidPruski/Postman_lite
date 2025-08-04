package com.dawidpruski.postman.service;

import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.dawidpruski.postman.dto.RequestDTO;
import com.dawidpruski.postman.dto.ResponseDTO;
import com.dawidpruski.postman.model.RequestResponseHistory;

@Service
public class RequestService {

    private final RestClient restClient;
    private final MongoDBService mongoDBService;

    public RequestService(MongoDBService mongoDBService) {
        this.restClient = RestClient.create();
        this.mongoDBService = mongoDBService;
    }

    public ResponseDTO executeRequest(RequestDTO request) {
        long startTime = System.currentTimeMillis();
        ResponseEntity<Map<String, Object>> response;
        switch (request.getMethod().toUpperCase()) {
            case "GET":
                response = restClient.get().uri(request.getUrl()).retrieve()
                        .toEntity(new ParameterizedTypeReference<Map<String, Object>>() {
                        });
                break;
            case "POST":
                response = restClient.post().uri(request.getUrl()).body(request.getBody()).retrieve()
                        .toEntity(new ParameterizedTypeReference<Map<String, Object>>() {
                        });
                break;
            case "DELETE":
                response = restClient.delete().uri(request.getUrl()).retrieve()
                        .toEntity(new ParameterizedTypeReference<Map<String, Object>>() {
                        });
                break;
            case "PUT":
                response = restClient.put().uri(request.getUrl()).body(request.getBody()).retrieve()
                        .toEntity(new ParameterizedTypeReference<Map<String, Object>>() {
                        });
                break;
            case "PATCH":
                response = restClient.patch().uri(request.getUrl()).body(request.getBody()).retrieve()
                        .toEntity(new ParameterizedTypeReference<Map<String, Object>>() {
                        });
                break;
            default:
                throw new IllegalArgumentException("Unsupported HTTP method: " + request.getMethod());
        }
        long responseTime = System.currentTimeMillis() - startTime;

        RequestDTO requestDTO = new RequestDTO(request.getUrl(), request.getMethod(), request.getHeaders(),
                request.getBody());

        ResponseDTO responseDTO = new ResponseDTO(request.getUrl(), request.getMethod(), request.getHeaders(),
                response.getBody(), response.getStatusCode().value(),
                response.getStatusCode().toString(), responseTime);

        RequestResponseHistory requestResponseHistory = new RequestResponseHistory(requestDTO, responseDTO);
        mongoDBService.createRequestHistory(requestResponseHistory);

        return responseDTO;
    }
}
