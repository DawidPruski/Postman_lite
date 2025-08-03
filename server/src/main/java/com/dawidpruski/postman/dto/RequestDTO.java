package com.dawidpruski.postman.dto;

import java.util.Optional;

public class RequestDTO {
    private String time;
    private String url;
    private String method;
    private Optional<String> body;

    public RequestDTO(String time, String url, String method, Optional<String> body) {
        this.time = time;
        this.url = url;
        this.method = method;
        this.body = body;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

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

    public Optional<String> getBody() {
        return body;
    }

    public void setBody(Optional<String> body) {
        this.body = body;
    }
}
