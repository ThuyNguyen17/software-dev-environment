package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.domain.model.StudentClass;
import com.example.project_management_class.domain.repository.StudentClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student-class")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentClassController {

    private final StudentClassRepository studentClassRepository;

    @GetMapping
    public ResponseEntity<List<StudentClass>> getAllStudentClasses() {
        return ResponseEntity.ok(studentClassRepository.findAll());
    }

    @PutMapping("/{id}/seat")
    public ResponseEntity<StudentClass> updateStudentSeat(
            @PathVariable String id,
            @RequestBody Map<String, Integer> payload) {
        
        StudentClass studentClass = studentClassRepository.findById(id).orElse(null);
        if (studentClass == null) {
            return ResponseEntity.notFound().build();
        }

        Integer seatIndex = payload.get("seatIndex");
        studentClass.setSeatIndex(seatIndex);
        
        studentClassRepository.save(studentClass);
        
        return ResponseEntity.ok(studentClass);
    }
}
