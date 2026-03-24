package com.example.project_management_class.domain.repository;

import com.example.project_management_class.domain.model.TeachingAssignment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeachingAssignmentRepository extends MongoRepository<TeachingAssignment, String> {
}

