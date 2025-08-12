package com.dawidpruski.postman.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import com.dawidpruski.postman.dto.api.RequestDto;
import com.dawidpruski.postman.dto.api.ResponseDto;

@Document(collection = "request_response_history")
public class RequestResponseHistory {

    @Transient
    public static final String SEQUENCE_NAME = "request_response_history_sequence";

    @Id
    private Long id;

    RequestDto requestDto;
    ResponseDto responseDto;

    public RequestResponseHistory() {
    }

    public RequestResponseHistory(RequestDto requestDto, ResponseDto responseDto) {
        this.requestDto = requestDto;
        this.responseDto = responseDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RequestDto getRequest() {
        return requestDto;
    }

    public void setRequest(RequestDto requestDto) {
        this.requestDto = requestDto;
    }

    public ResponseDto getResponse() {
        return responseDto;
    }

    public void setResponse(ResponseDto responseDto) {
        this.responseDto = responseDto;
    }

}
