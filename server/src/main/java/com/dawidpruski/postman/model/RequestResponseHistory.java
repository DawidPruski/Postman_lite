package com.dawidpruski.postman.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import com.dawidpruski.postman.dto.api.ApiRequestDto;
import com.dawidpruski.postman.dto.api.ApiResponseDto;

@Document(collection = "request_response_history")
public class RequestResponseHistory {

    @Transient
    public static final String SEQUENCE_NAME = "request_response_history_sequence";

    @Id
    private Long id;

    ApiRequestDto apiRequestDto;
    ApiResponseDto apiResponseDto;

    public RequestResponseHistory() {
    }

    public RequestResponseHistory(ApiRequestDto apiRequestDto, ApiResponseDto apiResponseDto) {
        this.apiRequestDto = apiRequestDto;
        this.apiResponseDto = apiResponseDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApiRequestDto getRequest() {
        return apiRequestDto;
    }

    public void setRequest(ApiRequestDto apiRequestDto) {
        this.apiRequestDto = apiRequestDto;
    }

    public ApiResponseDto getResponse() {
        return apiResponseDto;
    }

    public void setResponse(ApiResponseDto apiResponseDto) {
        this.apiResponseDto = apiResponseDto;
    }

}
