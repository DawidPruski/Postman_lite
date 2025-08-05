package com.dawidpruski.postman.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Service
public class RestClientService {

    private final RestClient restClient;

    public RestClientService() {
        this.restClient = RestClient.create();
    }

    public ResponseEntity<Object> executeRequest(String method, String url, Object body) {
        ResponseEntity<Object> response;
        try {
            switch (method) {
                case "GET":
                    response = restClient.get().uri(url).retrieve()
                            .toEntity(new ParameterizedTypeReference<Object>() {
                            });
                    break;
                case "POST":
                    response = restClient.post().uri(url).body(body).retrieve()
                            .toEntity(new ParameterizedTypeReference<Object>() {
                            });
                    break;
                case "DELETE":
                    response = restClient.delete().uri(url).retrieve()
                            .toEntity(new ParameterizedTypeReference<Object>() {
                            });
                    break;
                case "PUT":
                    response = restClient.put().uri(url).body(body).retrieve()
                            .toEntity(new ParameterizedTypeReference<Object>() {
                            });
                    break;
                case "PATCH":
                    response = restClient.patch().uri(url).body(body).retrieve()
                            .toEntity(new ParameterizedTypeReference<Object>() {
                            });
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported HTTP method: " + method);
            }
            return response;
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
