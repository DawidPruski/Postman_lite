package com.dawidpruski.postman.dto;

import org.springframework.http.HttpHeaders;

public record ResponseDTO(String url, String method, HttpHeaders headers, Object body,
        Integer statusCode, String statusText, Long time) {

}
