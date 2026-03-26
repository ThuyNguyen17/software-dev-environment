package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.dto.PendingStudentResponse;
import com.example.project_management_class.application.dto.PendingStudentsResponse;
import com.example.project_management_class.application.service.AttendanceService;
import com.example.project_management_class.application.util.ClassNameUtils;
import com.example.project_management_class.domain.enums.AttendanceStatus;
import com.example.project_management_class.domain.model.Attendance;
import com.example.project_management_class.domain.model.AttendanceSession;
import com.example.project_management_class.domain.model.SchoolClass;
import com.example.project_management_class.domain.model.Student;
import com.example.project_management_class.domain.model.StudentClass;
import com.example.project_management_class.domain.model.TeachingAssignment;
import com.example.project_management_class.domain.repository.AttendanceRepository;
import com.example.project_management_class.domain.repository.AttendanceSessionRepository;
import com.example.project_management_class.domain.repository.SchoolClassRepository;
import com.example.project_management_class.domain.repository.StudentClassRepository;
import com.example.project_management_class.domain.repository.StudentRepository;
import com.example.project_management_class.domain.repository.TeachingAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceSessionRepository sessionRepository;
    private final AttendanceRepository attendanceRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final StudentClassRepository studentClassRepository;
    private final StudentRepository studentRepository;
    private final SchoolClassRepository schoolClassRepository;

    private SchoolClass resolveSchoolClassByIdOrName(String classIdOrName) {
        if (classIdOrName == null) return null;
        String raw = classIdOrName.trim();
        if (raw.isEmpty()) return null;

        // Preferred: StudentClass.classId stores SchoolClass.id
        SchoolClass byId = schoolClassRepository.findById(raw).orElse(null);
        if (byId != null) return byId;

        // Backward-compat: StudentClass.classId stores a label like "10A1"
        String key = ClassNameUtils.normalizeToKey(raw);
        Integer grade = ClassNameUtils.parseGradeLevel(key);
        String simpleName = ClassNameUtils.parseClassSimpleName(key);
        if (grade == null || simpleName == null || simpleName.isBlank()) return null;
        return schoolClassRepository.findByGradeLevelAndClassNameIgnoreCase(grade, simpleName).orElse(null);
    }

    private static boolean isInvalidLocation(String location) {
        if (location == null) return true;
        String s = location.trim();
        if (s.isEmpty()) return true;

        String lower = s.toLowerCase();
        // Client-side strings we use when GPS is not available/denied.
        if (lower.contains("không thể lấy vị trí")) return true;
        if (lower.contains("khong the lay vi tri")) return true;
        if (lower.contains("từ chối")) return true;
        if (lower.contains("tu choi")) return true;
        if (lower.contains("đang lấy vị trí")) return true;
        if (lower.contains("dang lay vi tri")) return true;
        if (lower.contains("denied")) return true;
        return false;
    }

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

        if (isInvalidLocation(location)) {
            throw new RuntimeException("Vui long bat GPS va cho phep truy cap vi tri truoc khi diem danh.");
        }

        // Validate class
        String assignmentId = session.getTeachingAssignmentId();

        // Server-side validation: do not trust the client-provided class/name.
        TeachingAssignment teachingAssignment = teachingAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        Student studentFromDb = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<StudentClass> studentClasses = studentClassRepository.findByStudentId(studentId);
        if (studentClasses.isEmpty()) {
            throw new RuntimeException("Ban chua duoc xep lop nen khong the diem danh.");
        }
        String assignmentClassKey = ClassNameUtils.normalizeToKey(teachingAssignment.getClassName());
        if (assignmentClassKey.isBlank()) {
            throw new RuntimeException("Khong xac dinh duoc lop cua buoi hoc nay.");
        }

        // StudentClass has no timestamp/order guarantee. Resolve the student's class that matches the session assignment.
        String resolvedStudentClass = null;
        List<String> candidateStudentClasses = new ArrayList<>();
        for (StudentClass sc : studentClasses) {
            if (sc == null || sc.getClassId() == null || sc.getClassId().isBlank()) continue;

            String rawClassId = sc.getClassId().trim();
            SchoolClass schoolClass = resolveSchoolClassByIdOrName(rawClassId);
            if (schoolClass != null && schoolClass.getGradeLevel() != null && schoolClass.getClassName() != null) {
                String display = String.valueOf(schoolClass.getGradeLevel()) + schoolClass.getClassName();
                String key = ClassNameUtils.normalizeToKey(display);
                if (!key.isBlank()) candidateStudentClasses.add(display);

                if (key.equals(assignmentClassKey)) {
                    resolvedStudentClass = display;
                    break;
                }
                continue;
            }

            // Fallback: treat classId itself as a class label (e.g. "10A1") even if it doesn't resolve to a SchoolClass.
            String key = ClassNameUtils.normalizeToKey(rawClassId);
            if (!key.isBlank()) candidateStudentClasses.add(rawClassId);
            if (key.equals(assignmentClassKey)) {
                resolvedStudentClass = rawClassId;
                break;
            }
        }

        if (resolvedStudentClass == null) {
            if (candidateStudentClasses.isEmpty()) {
                throw new RuntimeException("Khong xac dinh duoc lop cua ban.");
            }
            throw new RuntimeException("Ban khong thuoc lop nay (" + teachingAssignment.getClassName() + "). Lop cua ban: " + String.join(", ", candidateStudentClasses));
        }

        boolean legacyClientValidationEnabled = false;
        if (legacyClientValidationEnabled && !"ASS001".equals(assignmentId)) {
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
        attendance.setStudentName(studentFromDb.getFullName());
        attendance.setStudentClass(resolvedStudentClass);
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
    public PendingStudentsResponse getPendingStudents(String sessionId) {
        AttendanceSession session = getSession(sessionId);
        String assignmentId = session.getTeachingAssignmentId();

        TeachingAssignment assignment = teachingAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        String className = assignment.getClassName();
        String classKey = ClassNameUtils.normalizeToKey(className);

        // Resolve SchoolClass by grade+section then load StudentClass by classId (SchoolClass.id).
        List<StudentClass> studentClasses = List.of();
        Integer gradeLevel = ClassNameUtils.parseGradeLevel(classKey);
        String classSimpleName = ClassNameUtils.parseClassSimpleName(classKey);
        if (gradeLevel != null && classSimpleName != null && !classSimpleName.isBlank()) {
            SchoolClass schoolClass = schoolClassRepository.findByGradeLevelAndClassNameIgnoreCase(gradeLevel, classSimpleName).orElse(null);
            if (schoolClass != null) {
                studentClasses = studentClassRepository.findByClassId(schoolClass.getId());
                if (studentClasses.isEmpty()) {
                    // Backward-compat: StudentClass.classId stores "10A1" (or similar) instead of SchoolClass.id.
                    String display = String.valueOf(gradeLevel) + classSimpleName;
                    studentClasses = studentClassRepository.findByClassIdIgnoreCase(display);
                    if (studentClasses.isEmpty()) {
                        studentClasses = studentClassRepository.findByClassIdIgnoreCase(classKey);
                    }
                }
            }
        }

        Set<String> attendedStudentIds = attendanceRepository.findByAttendanceSessionId(sessionId).stream()
                .map(Attendance::getStudentId)
                .collect(Collectors.toSet());

        List<String> pendingStudentIds = studentClasses.stream()
                .map(StudentClass::getStudentId)
                .filter(id -> id != null && !attendedStudentIds.contains(id))
                .distinct()
                .toList();

        Map<String, Student> studentsById = new ArrayList<>(studentRepository.findAllById(pendingStudentIds)).stream()
                .collect(Collectors.toMap(Student::getId, Function.identity(), (a, b) -> a));

        List<PendingStudentResponse> pending = pendingStudentIds.stream()
                .map(studentsById::get)
                .filter(s -> s != null)
                .map(s -> PendingStudentResponse.builder()
                        .studentId(s.getId())
                        .studentCode(s.getStudentCode())
                        .fullName(s.getFullName())
                        .className(className)
                        .build())
                .sorted(Comparator.comparing(PendingStudentResponse::getStudentCode, Comparator.nullsLast(String::compareToIgnoreCase)))
                .toList();

        return PendingStudentsResponse.builder()
                .sessionId(sessionId)
                .teachingAssignmentId(assignmentId)
                .className(className)
                .students(pending)
                .build();
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
}
