<<<<<<< HEAD
=======














>>>>>>> fix-final
package com.example.project_management_class.application.service;

import com.example.project_management_class.domain.model.Attendance;
import com.example.project_management_class.domain.model.AttendanceSession;

import java.time.LocalDate;
import java.util.List;
<<<<<<< HEAD

public interface AttendanceService {
    AttendanceSession createOrGetSession(String assignmentId, LocalDate date, Integer period, Integer semester);
=======
import java.util.Map;

public interface AttendanceService {
    AttendanceSession createOrGetSession(String assignmentId, LocalDate date, Integer period, Integer semester, Double latitude, Double longitude);
>>>>>>> fix-final
    AttendanceSession getSession(String sessionId);
    Attendance recordAttendance(String sessionId, String studentId, String studentName, String studentClass, String location, String qrToken, String note);
    Attendance updateAttendanceNote(String attendanceId, String note);
    List<Attendance> getAttendances(String sessionId);
<<<<<<< HEAD
    AttendanceSession updateQrToken(String sessionId, String newToken);
    void closeSession(String sessionId);
    void deleteAttendancesBySession(String sessionId);
    List<Attendance> getAttendancesByStudentId(String studentId);
}
=======
    List<Map<String, Object>> getMissingStudents(String sessionId);
    AttendanceSession updateQrToken(String sessionId, String newToken);
    void closeSession(String sessionId);
    void deleteAttendancesBySession(String sessionId);
}
>>>>>>> fix-final
