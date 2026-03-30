package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.service.ScoreService;
import com.example.project_management_class.domain.model.Score;
import com.example.project_management_class.domain.model.ScoreItem;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ScoreController {

    private final ScoreService scoreService;

    // View Scores cho 1 Học Sinh cụ thể
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Map<String, Object>>> getDetailedStudentScores(@PathVariable String studentId) {
        return ResponseEntity.ok(scoreService.getStudentScoresDetailed(studentId));
    }

    // View Scores theo môn học (cho GV chấm điểm)
    @GetMapping("/assignment/{assignmentId}")
    public ResponseEntity<List<Score>> getAssignmentScores(@PathVariable String assignmentId) {
        return ResponseEntity.ok(scoreService.getScoresByAssignmentId(assignmentId));
    }

    // Upsert Scores (Cập nhật 1 hay nhiều cột điểm cùng lúc)
    @PutMapping("/student/{studentId}/assignment/{assignmentId}")
    public ResponseEntity<Score> updateStudentScores(
            @PathVariable String studentId,
            @PathVariable String assignmentId,
            @RequestBody List<ScoreItem> scoreItems) {

        try {
            Score updated = scoreService.upsertScoreItems(studentId, assignmentId, scoreItems);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
