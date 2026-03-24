package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.service.AnnouncementService;
import com.example.project_management_class.domain.model.Announcement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/announcement")
@RequiredArgsConstructor
public class AnnouncementController {
    private final AnnouncementService announcementService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addAnnouncement(@RequestBody Announcement announcement) {
        announcementService.addAnnouncement(announcement);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Announcement Created!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllAnnouncements() {
        List<Announcement> announcements = announcementService.getAllAnnouncements();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("announcements", announcements);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteAnnouncement(@PathVariable String id) {
        announcementService.deleteAnnouncement(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Announcement Deleted!");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateAnnouncement(@PathVariable String id, @RequestBody Announcement announcement) {
        announcementService.updateAnnouncement(id, announcement);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Announcement Updated!");
        return ResponseEntity.ok(response);
    }
}
