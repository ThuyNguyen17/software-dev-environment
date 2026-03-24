package com.example.project_management_class.application.service;

import com.example.project_management_class.domain.model.Assignment;
import java.util.List;

public interface AssignmentService {
    void addAssignment(Assignment assignment);
    List<Assignment> getAllAssignments();
    void deleteAssignment(String id);
    Assignment updateAssignment(String id, Assignment assignment);
}
