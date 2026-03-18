package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.dto.LoginResponse;
import com.example.project_management_class.application.dto.StudentLoginResponse;
import com.example.project_management_class.application.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;
    @PostMapping("/login-new")
    public ResponseEntity<LoginResponse> loginNew(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        return ResponseEntity.ok(studentService.login(username, password));
    }

    @PostMapping("/login")
    public ResponseEntity<StudentLoginResponse> login(@RequestBody Map<String, String> request) {
        String studentCode = request.get("studentCode");
        return ResponseEntity.ok(studentService.login(studentCode));
    }

    @GetMapping("/{studentId}/subjects")
    public ResponseEntity<List<Map<String, Object>>> getSubjects(@PathVariable("studentId") String studentId) {
        return ResponseEntity.ok(studentService.getStudentSubjects(studentId));
    }

    @GetMapping("/{studentId}/subjects/{assignmentId}/attendance")
    public ResponseEntity<List<Map<String, Object>>> getAttendanceDetails(
            @PathVariable("studentId") String studentId,
            @PathVariable("assignmentId") String assignmentId) {
        return ResponseEntity.ok(studentService.getAttendanceDetails(studentId, assignmentId));
    }
}
