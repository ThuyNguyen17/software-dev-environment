package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.dto.TimetableResponseDTO;
import com.example.project_management_class.application.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
@CrossOrigin
public class ClassTimetableController {

    private final TimetableService timetableService;

    @GetMapping("/{className}/timetable")
    public List<TimetableResponseDTO> getClassTimetable(
            @PathVariable String className,
            @RequestParam int week,
            @RequestParam int year,
            @RequestParam int semester
    ) {
        return timetableService.getClassTimetable(className, week, year, semester);
    }
}

