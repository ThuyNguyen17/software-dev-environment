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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.project_management_class.domain.model.SchoolClass;
import com.example.project_management_class.domain.model.Student;
import com.example.project_management_class.domain.model.StudentClass;
import com.example.project_management_class.domain.repository.SchoolClassRepository;
import com.example.project_management_class.domain.repository.StudentClassRepository;
import com.example.project_management_class.domain.repository.StudentRepository;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceSessionRepository sessionRepository;
    private final AttendanceRepository attendanceRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final StudentClassRepository studentClassRepository;
    private final StudentRepository studentRepository;

    @Override
    public AttendanceSession createOrGetSession(String assignmentId, LocalDate date, Integer period, Integer semester, Double latitude, Double longitude) {
        Optional<AttendanceSession> existing = sessionRepository.findByTeachingAssignmentIdAndDateAndPeriod(assignmentId, date, period);
        if (existing.isPresent()) {
            AttendanceSession session = existing.get();
            if (!session.isOpen()) {
                session.setOpen(true);
                if (latitude != null) session.setLatitude(latitude);
                if (longitude != null) session.setLongitude(longitude);
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
        newSession.setLatitude(latitude);
        newSession.setLongitude(longitude);
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

        // Always validate student location string
        String sanitizedLoc = location != null ? location.trim() : "";
        if (sanitizedLoc.isEmpty() || sanitizedLoc.contains("Denied") || sanitizedLoc.contains("Lỗi") || sanitizedLoc.contains("0.0, 0.0") || sanitizedLoc.contains("Đang lấy")) {
            throw new RuntimeException("Không thể xác định vị trí của bạn. Vui lòng bật GPS và thử lại. (Lỗi: " + sanitizedLoc + ")");
        }

        // Validate distance if session has location
        if (session.getLatitude() != null && session.getLongitude() != null) {
            try {
                String[] parts = sanitizedLoc.split(",");
                if (parts.length == 2) {
                    double studentLat = Double.parseDouble(parts[0].trim());
                    double studentLng = Double.parseDouble(parts[1].trim());
                    
                    double distance = calculateDistanceInMeters(session.getLatitude(), session.getLongitude(), studentLat, studentLng);
                    
                    // Accept within 50 meters
                    if (distance > 50.0) {
                        throw new RuntimeException("Vị trí của bạn quá xa so với lớp học (" + String.format("%.1f", distance) + "m). Vui lòng quét mã tại lớp học.");
                    }
                } else {
                    throw new RuntimeException("Định dạng vị trí không hợp lệ.");
                }
            } catch (NumberFormatException e) {
                throw new RuntimeException("Lỗi xử lý vị trí. Yêu cầu bật GPS.");
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
    public List<Map<String, Object>> getMissingStudents(String sessionId) {
        AttendanceSession session = getSession(sessionId);
        String assignmentId = session.getTeachingAssignmentId();
        
        List<Map<String, Object>> missingStudents = new ArrayList<>();
        
        if ("ASS001".equals(assignmentId)) {
            return missingStudents;
        }
        
        TeachingAssignment assignment = teachingAssignmentRepository.findById(assignmentId).orElse(null);
        if (assignment == null || assignment.getClassName() == null) {
            return missingStudents;
        }
        
        String className = assignment.getClassName();
        
        SchoolClass targetClass = null;
        for (SchoolClass sc : schoolClassRepository.findAll()) {
            if ((sc.getGradeLevel() + sc.getClassName()).equalsIgnoreCase(className)) {
                targetClass = sc;
                break;
            }
        }
        
        if (targetClass == null) return missingStudents;
        
        List<StudentClass> studentClasses = studentClassRepository.findByClassId(targetClass.getId());
        List<String> studentIds = studentClasses.stream().map(StudentClass::getStudentId).collect(Collectors.toList());
        List<Student> allStudents = (List<Student>) studentRepository.findAllById(studentIds);
        
        List<Attendance> attendances = attendanceRepository.findByAttendanceSessionId(sessionId);
        List<String> attendedStudentIds = attendances.stream().map(Attendance::getStudentId).collect(Collectors.toList());
        
        for (Student s : allStudents) {
            if (!attendedStudentIds.contains(s.getId())) {
                Map<String, Object> map = new HashMap<>();
                map.put("studentId", s.getId());
                map.put("studentCode", s.getStudentCode());
                map.put("studentName", s.getFullName());
                map.put("studentClass", className);
                missingStudents.add(map);
            }
        }
        
        return missingStudents;
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

    private double calculateDistanceInMeters(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1000; // convert to meters
    }
}
