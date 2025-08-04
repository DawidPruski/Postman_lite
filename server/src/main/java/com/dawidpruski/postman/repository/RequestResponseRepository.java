package com.dawidpruski.postman.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dawidpruski.postman.model.RequestResponseHistory;

@Repository
public interface RequestResponseRepository extends MongoRepository<RequestResponseHistory, ObjectId> {
}
