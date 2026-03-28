package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.service.AssignmentService;
import com.example.project_management_class.domain.model.Assignment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/assignments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AssignmentController {
    private final AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addAssignment(@RequestBody Assignment assignment) {
        assignmentService.addAssignment(assignment);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Assignment Created!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("assignments", assignments);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteAssignment(@PathVariable String id) {
        assignmentService.deleteAssignment(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Assignment Deleted!");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateAssignment(@PathVariable String id, @RequestBody Assignment assignment) {
        assignmentService.updateAssignment(id, assignment);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Assignment Updated!");
        return ResponseEntity.ok(response);
    }
}
