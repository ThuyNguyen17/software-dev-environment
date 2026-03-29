package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.AttendanceService;
import com.example.project_management_class.domain.enums.AttendanceStatus;
import com.example.project_management_class.domain.model.Attendance;
import com.example.project_management_class.domain.model.AttendanceSession;
import com.example.project_management_class.domain.model.TeachingAssignment;
import com.example.project_management_class.domain.repository.AttendanceRepository;
import com.example.project_management_class.domain.repository.AttendanceSessionRepository;
import com.example.project_management_class.domain.repository.TeachingAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceSessionRepository sessionRepository;
    private final AttendanceRepository attendanceRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;

    @Override
    public AttendanceSession createOrGetSession(String assignmentId, LocalDate date, Integer period, Integer semester) {
        Optional<AttendanceSession> existing = sessionRepository.findByTeachingAssignmentIdAndDateAndPeriod(assignmentId, date, period);
        if (existing.isPresent()) {
            AttendanceSession session = existing.get();
            if (!session.isOpen()) {
                session.setOpen(true);
                sessionRepository.save(session);
            }
            return session;
        }

        AttendanceSession newSession = new AttendanceSession();
        newSession.setTeachingAssignmentId(assignmentId);
        newSession.setDate(date);
        newSession.setPeriod(period);
        newSession.setSemester(semester);
        newSession.setOpen(true);
        // Initial token or empty
        newSession.setQrToken(""); 
        
        return sessionRepository.save(newSession);
    }

    @Override
    public AttendanceSession getSession(String sessionId) {
        return sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
    }

    @Override
    public Attendance recordAttendance(String sessionId, String studentId, String studentName, String studentClass, String location, String qrToken, String note) {
        AttendanceSession session = getSession(sessionId);
        if (!session.isOpen()) {
            throw new RuntimeException("Attendance session is closed");
        }
        
        // Check token validity (allow current or previous token for grace period)
        if (qrToken == null || (!qrToken.equals(session.getQrToken()) && !qrToken.equals(session.getPreviousQrToken()))) {
            throw new RuntimeException("Invalid or expired QR token");
        }

        // Check for existing attendance for this student in this session
        Optional<Attendance> existing = attendanceRepository.findByAttendanceSessionIdAndStudentId(sessionId, studentId);
        if (existing.isPresent()) {
            throw new RuntimeException("Bạn đã điểm danh cho buổi học này rồi.");
        }

        // Validate class
        String assignmentId = session.getTeachingAssignmentId();
        if (!"ASS001".equals(assignmentId)) {
            TeachingAssignment assignment = teachingAssignmentRepository.findById(assignmentId)
                    .orElseThrow(() -> new RuntimeException("Assignment not found"));
            
            if (!assignment.getClassName().equalsIgnoreCase(studentClass)) {
                throw new RuntimeException("Bạn không thuộc lớp này (" + assignment.getClassName() + ")");
            }
        }
        
        // Create attendance record
        Attendance attendance = new Attendance();
        attendance.setAttendanceSessionId(sessionId);
        attendance.setStudentId(studentId);
        attendance.setStudentName(studentName);
        attendance.setStudentClass(studentClass);
        attendance.setLocation(location);
        attendance.setNote(note);
        attendance.setStatus(AttendanceStatus.PRESENT);
        attendance.setAttendanceType("QR");
        attendance.setCheckInTime(LocalTime.now());
        
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance updateAttendanceNote(String attendanceId, String note) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance record not found"));
        attendance.setNote(note);
        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAttendances(String sessionId) {
        return attendanceRepository.findByAttendanceSessionId(sessionId);
    }

    @Override
    public AttendanceSession updateQrToken(String sessionId, String newToken) {
        AttendanceSession session = getSession(sessionId);
        session.setPreviousQrToken(session.getQrToken()); // Store previous token
        session.setQrToken(newToken);
        return sessionRepository.save(session);
    }

    @Override
    public void closeSession(String sessionId) {
        AttendanceSession session = getSession(sessionId);
        session.setOpen(false);
        sessionRepository.save(session);
    }

    @Override
    public void deleteAttendancesBySession(String sessionId) {
        attendanceRepository.deleteAllByAttendanceSessionId(sessionId);
    }

    @Override
    public List<Attendance> getAttendancesByStudentId(String studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }
}
