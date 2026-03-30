package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.ScoreService;
import com.example.project_management_class.domain.model.Score;
import com.example.project_management_class.domain.model.ScoreItem;
import com.example.project_management_class.domain.model.TeachingAssignment;
import com.example.project_management_class.domain.repository.ScoreRepository;
import com.example.project_management_class.domain.repository.TeachingAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService {

    private final ScoreRepository scoreRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;

    @Override
    public List<Map<String, Object>> getStudentScoresDetailed(String studentId) {
        List<Score> scores = scoreRepository.findByStudentId(studentId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Score score : scores) {
            Map<String, Object> map = new HashMap<>();
            map.put("scoreId", score.getId());
            map.put("assignmentId", score.getTeachingAssignmentId());
            map.put("studentId", score.getStudentId());
            
            // Format Items into a clear Object mapping Type -> Value
            Map<String, Double> formattedItems = new HashMap<>();
            if (score.getItems() != null) {
                for (ScoreItem item : score.getItems()) {
                    if (item != null && item.getType() != null) {
                        formattedItems.put(item.getType().name(), item.getValue());
                    }
                }
            }
            map.put("scores", formattedItems);

            // Fetch Assignment details
            Optional<TeachingAssignment> assignmentOpt = teachingAssignmentRepository.findById(score.getTeachingAssignmentId());
            if (assignmentOpt.isPresent()) {
                map.put("subjectName", assignmentOpt.get().getSubjectName());
                map.put("className", assignmentOpt.get().getClassName());
                map.put("semester", assignmentOpt.get().getSemester());
            } else {
                map.put("subjectName", "Unknown Subject");
                map.put("className", "Unknown Class");
            }
            
            result.add(map);
        }

        return result;
    }

    @Override
    public List<Score> getScoresByAssignmentId(String assignmentId) {
        return scoreRepository.findByTeachingAssignmentId(assignmentId);
    }

    @Override
    public Score upsertScoreItems(String studentId, String assignmentId, List<ScoreItem> items) {
        Optional<Score> existingOpt = scoreRepository.findByStudentIdAndTeachingAssignmentId(studentId, assignmentId);
        
        Score score;
        if (existingOpt.isPresent()) {
            score = existingOpt.get();
            // Merge items: overwriting specific ScoreTypes
            List<ScoreItem> currentItems = score.getItems() != null ? new ArrayList<>(score.getItems()) : new ArrayList<>();
            
            for (ScoreItem newItem : items) {
                // Remove the old item of the same type if exists
                currentItems.removeIf(i -> i.getType() == newItem.getType());
                if(newItem.getDate() == null) {
                    newItem.setDate(LocalDate.now());
                }
                currentItems.add(newItem);
            }
            score.setItems(currentItems);
        } else {
            // Create brand new Score record for Student in this Assignment
            score = new Score();
            score.setStudentId(studentId);
            score.setTeachingAssignmentId(assignmentId);
            
            for (ScoreItem newItem : items) {
                if(newItem.getDate() == null) {
                    newItem.setDate(LocalDate.now());
                }
            }
            score.setItems(items);
        }
        
        return scoreRepository.save(score);
    }

    @Override
    public Score upsertNote(String studentId, String assignmentId, String note) {
        Optional<Score> existingOpt = scoreRepository.findByStudentIdAndTeachingAssignmentId(studentId, assignmentId);
        Score score;
        if (existingOpt.isPresent()) {
            score = existingOpt.get();
        } else {
            score = new Score();
            score.setStudentId(studentId);
            score.setTeachingAssignmentId(assignmentId);
        }
        score.setNote(note);
        return scoreRepository.save(score);
    }
}
