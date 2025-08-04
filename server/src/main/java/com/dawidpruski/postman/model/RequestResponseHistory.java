package com.dawidpruski.postman.model;

import org.springframework.data.annotation.Id;

import com.dawidpruski.postman.dto.RequestDTO;
import com.dawidpruski.postman.dto.ResponseDTO;

public class RequestResponseHistory {

    @Id
    private String id;

    RequestDTO request;
    ResponseDTO response;

    public RequestResponseHistory(RequestDTO request, ResponseDTO response) {
        this.request = request;
        this.response = response;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public RequestDTO getRequest() {
        return request;
    }

    public void setRequest(RequestDTO request) {
        this.request = request;
    }

    public ResponseDTO getResponse() {
        return response;
    }

    public void setResponse(ResponseDTO response) {
        this.response = response;
    }

}
