package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.AssignmentService;
import com.example.project_management_class.domain.model.Assignment;
import com.example.project_management_class.domain.repository.AssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {
    private final AssignmentRepository assignmentRepository;

    @Override
    public void addAssignment(Assignment assignment) {
        assignmentRepository.save(assignment);
    }

    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @Override
    public void deleteAssignment(String id) {
        assignmentRepository.deleteById(id);
    }

    @Override
    public Assignment updateAssignment(String id, Assignment assignment) {
        assignment.setId(id);
        return assignmentRepository.save(assignment);
    }
}
