









package com.example.project_management_class.application.service;

import com.example.project_management_class.application.dto.LoginResponse;
import com.example.project_management_class.application.dto.StudentLoginResponse;
import com.example.project_management_class.domain.model.Attendance;

import java.util.List;
import java.util.Map;

public interface StudentService {
    LoginResponse login(String username, String password);
    StudentLoginResponse login(String studentCode);
    List<Map<String, Object>> getStudentSubjects(String studentId);
    List<Map<String, Object>> getAttendanceDetails(String studentId, String assignmentId);
    List<Map<String, Object>> getStudentsByClass(String className);
}



