<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI














<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
package com.example.project_management_class.application.service;

import com.example.project_management_class.domain.model.Attendance;
import com.example.project_management_class.domain.model.AttendanceSession;

import java.time.LocalDate;
import java.util.List;
<<<<<<< HEAD
=======
<<<<<<< HEAD

public interface AttendanceService {
    AttendanceSession createOrGetSession(String assignmentId, LocalDate date, Integer period, Integer semester);
=======
>>>>>>> remotes/origin/Update-UX/UI
import java.util.Map;

public interface AttendanceService {
    AttendanceSession createOrGetSession(String assignmentId, LocalDate date, Integer period, Integer semester, Double latitude, Double longitude);
<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
    AttendanceSession getSession(String sessionId);
    Attendance recordAttendance(String sessionId, String studentId, String studentName, String studentClass, String location, String qrToken, String note);
    Attendance updateAttendanceNote(String attendanceId, String note);
    List<Attendance> getAttendances(String sessionId);
<<<<<<< HEAD
=======
<<<<<<< HEAD
    AttendanceSession updateQrToken(String sessionId, String newToken);
    void closeSession(String sessionId);
    void deleteAttendancesBySession(String sessionId);
    List<Attendance> getAttendancesByStudentId(String studentId);
}
=======
>>>>>>> remotes/origin/Update-UX/UI
    List<Map<String, Object>> getMissingStudents(String sessionId);
    AttendanceSession updateQrToken(String sessionId, String newToken);
    void closeSession(String sessionId);
    void deleteAttendancesBySession(String sessionId);
<<<<<<< HEAD
}
=======
}
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
