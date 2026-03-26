package com.example.project_management_class.domain.repository;

import com.example.project_management_class.domain.model.SchoolClass;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SchoolClassRepository extends MongoRepository<SchoolClass, String> {
    Optional<SchoolClass> findByGradeLevelAndClassName(Integer gradeLevel, String className);
    Optional<SchoolClass> findByGradeLevelAndClassNameIgnoreCase(Integer gradeLevel, String className);
}
