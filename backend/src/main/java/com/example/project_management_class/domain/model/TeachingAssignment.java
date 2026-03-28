<<<<<<< HEAD
=======
<<<<<<< HEAD
package com.example.project_management_class.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "teaching_assignments")
@Data
=======


>>>>>>> remotes/origin/Update-UX/UI
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
<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
public class TeachingAssignment {

    @Id
    private String id;
<<<<<<< HEAD
=======
<<<<<<< HEAD

    private String teacherId;
    private String subjectName;
    private String className; // e.g. "10A1"
    private Integer academicYear;
    private Integer semester;
}

=======
>>>>>>> remotes/origin/Update-UX/UI
    private String teacherId;
    private String subjectName;
    private String className;

    private int academicYear;
    private int semester;
<<<<<<< HEAD
}
=======
}
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
