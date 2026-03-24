package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.service.EventService;
import com.example.project_management_class.domain.model.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addEvent(@RequestBody Event event) {
        eventService.addEvent(event);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Event Created!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("events", events);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Event Deleted!");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateEvent(@PathVariable String id, @RequestBody Event event) {
        eventService.updateEvent(id, event);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Event Updated!");
        return ResponseEntity.ok(response);
    }
}
