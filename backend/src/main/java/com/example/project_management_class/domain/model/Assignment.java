package com.example.project_management_class.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
<<<<<<< HEAD
import org.springframework.data.mongodb.core.mapping.Document;

=======
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
>>>>>>> fix-final
import java.time.LocalDate;

@Data
@Document(collection = "assignments")
public class Assignment {
    @Id
    private String id;
    private String title;
    
<<<<<<< HEAD
=======
    @Indexed(unique = true)
>>>>>>> fix-final
    private String description;
    
    private String grade;
    private LocalDate deadline;
}
