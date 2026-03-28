package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.dto.LoginResponse;
import com.example.project_management_class.application.dto.StudentLoginResponse;
import com.example.project_management_class.application.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.project_management_class.domain.model.Student;

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
    public ResponseEntity<List<Map<String, Object>>> getSubjects(@PathVariable String studentId) {
        return ResponseEntity.ok(studentService.getStudentSubjects(studentId));
    }

    @GetMapping("/{studentId}/subjects/{assignmentId}/attendance")
    public ResponseEntity<List<Map<String, Object>>> getAttendanceDetails(
            @PathVariable String studentId,
            @PathVariable String assignmentId) {
        return ResponseEntity.ok(studentService.getAttendanceDetails(studentId, assignmentId));
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PostMapping(value = "/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> importStudents(@RequestParam("file") MultipartFile file) {
        try {
            studentService.importStudentsFromExcel(file);
            return ResponseEntity.ok(Map.of("message", "Import thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi khi import file: " + e.getMessage()));
        }
    }

    @GetMapping("/export")
    public ResponseEntity<InputStreamResource> exportStudents() {
        String filename = "students.xlsx";
        InputStreamResource file = new InputStreamResource(studentService.exportStudentsToExcel());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}
