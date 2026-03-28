package com.example.project_management_class.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "assignments")
public class Assignment {
    @Id
    private String id;
    private String title;
    
    private String description;
    
    private String grade;
    private LocalDate deadline;
}
