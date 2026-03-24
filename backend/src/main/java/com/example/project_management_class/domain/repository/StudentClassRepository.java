package com.example.project_management_class.domain.repository;

import com.example.project_management_class.domain.model.StudentClass;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StudentClassRepository extends MongoRepository<StudentClass, String> {
    List<StudentClass> findByStudentId(String studentId);
}

