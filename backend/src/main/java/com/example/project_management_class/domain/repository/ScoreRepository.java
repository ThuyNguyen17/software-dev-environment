package com.example.project_management_class.domain.repository;

import com.example.project_management_class.domain.model.Score;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends MongoRepository<Score, String> {
}
