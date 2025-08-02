package com.dawidpruski.postman.dto;

public class RequestDTO {
    String time;
    String url;
    String method;
    String response;

    public RequestDTO(String time, String url, String method, String response) {
        this.time = time;
        this.url = url;
        this.method = method;
        this.response = response;
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

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
