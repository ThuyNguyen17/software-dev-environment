<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI












































<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
package com.example.project_management_class.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "attendance_sessions")
@Data
public class AttendanceSession {

    @Id
    private String id;

    private String teachingAssignmentId;
    private LocalDate date;
    private Integer semester;
    private Integer period;
    private boolean open;
<<<<<<< HEAD
=======
<<<<<<< HEAD

    private String qrToken;
    private String previousQrToken;
}

=======
>>>>>>> remotes/origin/Update-UX/UI
    private String qrToken;
    private String previousQrToken;
    private Double latitude;
    private Double longitude;
<<<<<<< HEAD
}
=======
}
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
