package com.dawidpruski.postman.service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoDatabase;

@Service
public class MongoDBService {
    private final MongoTemplate mongoTemplate;

    public MongoDBService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public String testConnection() {
        MongoDatabase mongoDatabase = mongoTemplate.getDb();
        String dbName = mongoDatabase.getName();
        // int collectionsCount = mongoTemplate.getCollectionNames().size();

        return """
                <h3>MongoDB connection successful!</h3>
                <p><strong>Database:</strong> %s</p>
                <p><strong>Collections:</strong> </p>
                """.formatted(dbName);
    }
}
