package com.dawidpruski.postman.service;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.dawidpruski.postman.model.RequestResponseHistory;
import com.dawidpruski.postman.repository.RequestResponseRepository;
import com.mongodb.client.MongoDatabase;

// TODO: Delete?
@Service
public class MongoDBService {
    private final MongoTemplate mongoTemplate;
    private final RequestResponseRepository requestRepository;

    public MongoDBService(MongoTemplate mongoTemplate, RequestResponseRepository requestRepository) {
        this.mongoTemplate = mongoTemplate;
        this.requestRepository = requestRepository;
    }

    public String testConnection() {
        MongoDatabase mongoDatabase = mongoTemplate.getDb();
        String dbName = mongoDatabase.getName();
        int collectionsCount = mongoTemplate.getCollectionNames().size();

        return """
                <h3>MongoDB connection successful!</h3>
                <p><strong>Database:</strong> %s</p>
                <p><strong>Collections:</strong> %d </p>
                """.formatted(dbName, collectionsCount);
    }

    public List<RequestResponseHistory> returnRequestResponseHistory() {
        return requestRepository.findAll();
    }

    public RequestResponseHistory createRequestHistory(RequestResponseHistory requestResponseHistory) {
        return requestRepository.save(requestResponseHistory);
    }
}
