package com.dawidpruski.postman.dto.api;

import java.util.Map;

public record RequestDto(String url, String method, Map<String, String> headers, Object body) {
}
