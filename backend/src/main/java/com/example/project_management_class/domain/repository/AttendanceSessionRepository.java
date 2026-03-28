<<<<<<< HEAD
=======




>>>>>>> fix-final
package com.example.project_management_class.domain.repository;

import com.example.project_management_class.domain.model.AttendanceSession;
import org.springframework.data.mongodb.repository.MongoRepository;
<<<<<<< HEAD

=======
>>>>>>> fix-final
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceSessionRepository extends MongoRepository<AttendanceSession, String> {
<<<<<<< HEAD
    List<AttendanceSession> findByTeachingAssignmentId(String teachingAssignmentId);
    Optional<AttendanceSession> findByTeachingAssignmentIdAndDateAndPeriod(String teachingAssignmentId, LocalDate date, Integer period);
=======
    Optional<AttendanceSession> findByTeachingAssignmentIdAndDateAndPeriod(String teachingAssignmentId, LocalDate date, Integer period);
    List<AttendanceSession> findByTeachingAssignmentId(String teachingAssignmentId);
>>>>>>> fix-final
}

