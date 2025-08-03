package com.dawidpruski.postman.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.dawidpruski.postman.dto.RequestDTO;
import com.dawidpruski.postman.dto.ResponseDTO;

@Service
public class RequestService {

    private final RestClient restClient;

    public RequestService() {
        this.restClient = RestClient.create();
    }

    public ResponseDTO executeRequest(RequestDTO request) {
        long startTime = System.currentTimeMillis();
        ResponseEntity<String> response;
        switch (request.getMethod().toUpperCase()) {
            case "GET":
                response = restClient.get().uri(request.getUrl()).retrieve().toEntity(String.class);
                break;
            case "POST":
                response = restClient.post().body(request.getBody()).retrieve().toEntity(String.class);
                break;
            case "DELETE":
                response = restClient.delete().uri(request.getUrl()).retrieve().toEntity(String.class);
                break;
            case "PUT":
                response = restClient.put().uri(request.getUrl()).retrieve().toEntity(String.class);
                break;
            case "PATCH":
                response = restClient.patch().uri(request.getUrl()).retrieve().toEntity(String.class);
                break;
            default:
                throw new IllegalArgumentException("Unsupported HTTP method: " + request.getMethod());
        }
        long responseTime = System.currentTimeMillis() - startTime;

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setTime(responseTime + "ms");
        responseDTO.setUrl(request.getUrl());
        responseDTO.setMethod(request.getMethod());
        responseDTO.setResponseBody(response.getBody());
        responseDTO.setStatusCode(response.getStatusCode().value());
        responseDTO.setStatusText(response.getStatusCode().toString());

        return responseDTO;
    }
}
