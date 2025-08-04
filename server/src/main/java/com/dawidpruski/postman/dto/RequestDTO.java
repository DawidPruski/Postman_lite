package com.dawidpruski.postman.dto;

import java.util.Map;

public class RequestDTO {
    private String url;
    private String method;

    private Map<String, String> headers;
    private Map<String, Object> body;
    private Boolean isError;

    public RequestDTO(String url, String method, Map<String, String> headers, Map<String, Object> body) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }

    private String errorMessage;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public void setHeaders(Map<String, String> headers) {
        this.headers = headers;
    }

    public Map<String, Object> getBody() {
        return body;
    }

    public void setBody(Map<String, Object> body) {
        this.body = body;
    }

    public Boolean getIsError() {
        return isError;
    }

    public void setIsError(Boolean isError) {
        this.isError = isError;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
