package com.example.project_management_class.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "exams")
public class Exam {
    @Id
    private String id;
    private String name;
    
    @Indexed(unique = true)
    private String registrationNumber;
    
    private String className;
    private Integer marks;
}
