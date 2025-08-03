package com.dawidpruski.postman.dto;

public class ResponseDTO {
    private String time;
    private String url;
    private String method;
    private String responseBody;
    private int statusCode;
    private String statusText;

    public ResponseDTO(String time, String url, String method, String responseBody, int statusCode,
            String statusText) {
        this.time = time;
        this.url = url;
        this.method = method;
        this.responseBody = responseBody;
        this.statusCode = statusCode;
        this.statusText = statusText;
    }

    public ResponseDTO() {

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

    public String getResponseBody() {
        return responseBody;
    }

    public void setResponseBody(String responseBody) {
        this.responseBody = responseBody;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusText() {
        return statusText;
    }

    public void setStatusText(String statusText) {
        this.statusText = statusText;
    }
}
