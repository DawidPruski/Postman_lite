package com.dawidpruski.postman.service;

import java.util.Objects;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dawidpruski.postman.dto.api.ApiRequestDto;
import com.dawidpruski.postman.dto.api.ApiResponseDto;
import com.dawidpruski.postman.model.DatabaseSequence;
import com.dawidpruski.postman.model.RequestResponseHistory;

@Service
public class ApiRequestService {

        private final RestClientService restClientService;
        private final MongoDBService mongoDBService;
        private final MongoOperations mongoOperations;

        public ApiRequestService(RestClientService restClientService, MongoDBService mongoDBService,
                        MongoOperations mongoOperations) {
                this.restClientService = restClientService;
                this.mongoDBService = mongoDBService;
                this.mongoOperations = mongoOperations;
        }

        public ResponseEntity<Object> sendRequestAndSaveHistory(ApiRequestDto request) {
                long startTime = System.currentTimeMillis();
                var response = restClientService.executeRequest(request.method().toUpperCase(), request.url(),
                                request.body());
                long responseTime = System.currentTimeMillis() - startTime;

                ApiRequestDto apiRequestDto = new ApiRequestDto(request.url(), request.method(), request.headers(),
                                request.body());

                ApiResponseDto apiResponseDto = new ApiResponseDto(request.url(), request.method(),
                                response.getHeaders(),
                                response.getBody(), response.getStatusCode().value(),
                                response.getStatusCode().toString(), responseTime);

                RequestResponseHistory requestResponseHistory = new RequestResponseHistory();
                requestResponseHistory.setId(generateSequence(RequestResponseHistory.SEQUENCE_NAME));
                requestResponseHistory.setRequest(apiRequestDto);
                requestResponseHistory.setResponse(apiResponseDto);
                mongoDBService.createRequestHistory(requestResponseHistory);
                return response;
        }

        private long generateSequence(String seqName) {
                DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                                new Update().inc("seq", 1), options().returnNew(true).upsert(true),
                                DatabaseSequence.class);
                return !Objects.isNull(counter) ? counter.getSeq() : 1;
        }
}
