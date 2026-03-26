package com.example.project_management_class.domain.repository;

import com.example.project_management_class.domain.model.StudentClass;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentClassRepository extends MongoRepository<StudentClass, String> {
    List<StudentClass> findByStudentId(String studentId);
    Optional<StudentClass> findByStudentIdAndAcademicYearId(String studentId, String academicYearId);
}
