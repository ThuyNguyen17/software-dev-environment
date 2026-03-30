package com.example.project_management_class.application.service;

import com.example.project_management_class.domain.model.Score;
import com.example.project_management_class.domain.model.ScoreItem;

import java.util.List;
import java.util.Map;

public interface ScoreService {
    
    // API Role Student
    List<Map<String, Object>> getStudentScoresDetailed(String studentId);
    
    // Lấy DS Điểm của cả lớp (Role Admin/Teacher)
    List<Score> getScoresByAssignmentId(String assignmentId);
    
    // Upsert (Tìm hoặc tạo mới)
    Score upsertScoreItems(String studentId, String assignmentId, List<ScoreItem> items);
}
