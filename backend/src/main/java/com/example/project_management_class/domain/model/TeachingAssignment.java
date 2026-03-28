<<<<<<< HEAD
package com.example.project_management_class.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "teaching_assignments")
@Data
=======


package com.example.project_management_class.domain.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "teaching_assignments")
>>>>>>> fix-final
public class TeachingAssignment {

    @Id
    private String id;
<<<<<<< HEAD

    private String teacherId;
    private String subjectName;
    private String className; // e.g. "10A1"
    private Integer academicYear;
    private Integer semester;
}

=======
    private String teacherId;
    private String subjectName;
    private String className;

    private int academicYear;
    private int semester;
}
>>>>>>> fix-final
