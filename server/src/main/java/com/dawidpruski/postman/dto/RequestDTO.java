package com.dawidpruski.postman.dto;

import java.util.Map;

public record RequestDTO(String url, String method, Map<String, String> headers, Object body) {
}
