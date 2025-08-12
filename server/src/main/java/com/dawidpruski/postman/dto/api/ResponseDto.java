package com.dawidpruski.postman.dto.api;

import org.springframework.http.HttpHeaders;

public record ResponseDto(String url, String method, HttpHeaders headers, Object body,
        Integer statusCode, String statusText, Long time) {

}
