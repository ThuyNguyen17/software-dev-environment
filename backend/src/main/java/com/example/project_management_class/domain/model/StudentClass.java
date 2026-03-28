<<<<<<< HEAD
=======
<<<<<<< HEAD
=======













>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
package com.example.project_management_class.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student_classes")
@Data
public class StudentClass {

    @Id
    private String id;

<<<<<<< HEAD
=======
<<<<<<< HEAD
    private String studentId;
    private String classId;
    private String academicYearId;
}

=======
>>>>>>> remotes/origin/Update-UX/UI
    private String academicYearId;   // ⭐ thêm cái này
    private String studentId;
    private String classId;
}
<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
