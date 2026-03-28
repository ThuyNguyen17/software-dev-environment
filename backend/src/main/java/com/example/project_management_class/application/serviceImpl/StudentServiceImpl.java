


package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.StudentService;
import com.example.project_management_class.application.util.ClassNameUtils;
import com.example.project_management_class.application.dto.LoginResponse;
import com.example.project_management_class.application.dto.StudentLoginResponse;
import com.example.project_management_class.domain.enums.Role;
import com.example.project_management_class.domain.model.*;
import com.example.project_management_class.domain.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final StudentClassRepository studentClassRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final AttendanceSessionRepository attendanceSessionRepository;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

        SchoolClass byGradeAndName = schoolClassRepository.findByGradeLevelAndClassNameIgnoreCase(grade, simpleName).orElse(null);
        if (byGradeAndName != null) return byGradeAndName;

        // Tolerant fallbacks for inconsistent datasets:
        // - some store className as "A1" but gradeLevel is stored with an unexpected type (string/number mismatch)
        // - some store className as the full label like "10A1"
        String display = ClassNameUtils.formatDisplayClassName(raw);
        List<SchoolClass> bySimple = schoolClassRepository.findByClassNameIgnoreCase(simpleName);
        if (bySimple != null && !bySimple.isEmpty()) {
            SchoolClass best = pickBestByGrade(bySimple, grade);
            if (best != null) return best;
        }

        if (display != null && !display.isBlank()) {
            List<SchoolClass> byDisplay = schoolClassRepository.findByClassNameIgnoreCase(display);
            if (byDisplay != null && !byDisplay.isEmpty()) {
                SchoolClass best = pickBestByGrade(byDisplay, grade);
                if (best != null) return best;
            }
        }

        return null;
    }

    private static SchoolClass pickBestByGrade(List<SchoolClass> candidates, Integer grade) {
        if (candidates == null || candidates.isEmpty()) return null;
        if (grade != null) {
            for (SchoolClass c : candidates) {
                if (c != null && grade.equals(c.getGradeLevel())) return c;
            }
        }
        for (SchoolClass c : candidates) {
            if (c != null) return c;
        }
        return null;
    }

    @Override
    public LoginResponse login(String username, String password) {
        String normalizedUsername = username == null ? "" : username.trim();
        User user = userRepository.findByUsername(normalizedUsername)
                .orElseThrow(() -> new RuntimeException("Sai tai khoan hoac mat khau"));

        if (Boolean.FALSE.equals(user.getActive())) {
            throw new RuntimeException("Tai khoan da bi khoa");
        }

        String stored = user.getPassword() == null ? "" : user.getPassword();
        boolean ok;
        // Backward-compat: support both plaintext (old demo data) and bcrypt hashes (NodeJS seeder).
        if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
            ok = passwordEncoder.matches(password, stored);
        } else {
            ok = stored.equals(password);
        }
        if (!ok) {
            throw new RuntimeException("Sai tai khoan hoac mat khau");
        }

        LoginResponse.LoginResponseBuilder builder = LoginResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .role(user.getRole());

        if (user.getRole() == Role.STUDENT) {
            // Mongoose commonly stores userId as ObjectId, while this Java model uses String.
            // To stay compatible with seeded demo data (username like "HS001"), fall back to lookups by id/code.
            Student student = studentRepository.findByUserId(user.getId())
                    .or(() -> studentRepository.findById(user.getUsername()))
                    .or(() -> studentRepository.findByStudentCode(user.getUsername()))
                    .orElseThrow(() -> new RuntimeException("Thông tin học sinh không tồn tại"));
            
            builder.studentId(student.getId())
                    .studentCode(student.getStudentCode())
                    .fullName(student.getFullName());

            // Get class name
            List<StudentClass> studentClasses = studentClassRepository.findByStudentId(student.getId());
            if (!studentClasses.isEmpty()) {
                StudentClass sc = studentClasses.get(studentClasses.size() - 1);
                SchoolClass schoolClass = resolveSchoolClassByIdOrName(sc.getClassId());
                if (schoolClass != null && schoolClass.getGradeLevel() != null && schoolClass.getClassName() != null) {
                    builder.className(ClassNameUtils.formatDisplayClassName(
                            schoolClass.getGradeLevel(),
                            schoolClass.getClassName()
                    ));
                } else if (sc.getClassId() != null && !sc.getClassId().isBlank()) {
                    builder.className(ClassNameUtils.formatDisplayClassName(sc.getClassId().trim()));
                }
            }
        } else if (user.getRole() == Role.TEACHER) {
            // Same compatibility concern as Student.userId: seeded data uses teacher id like "GV001".
            Teacher teacher = teacherRepository.findByUserId(user.getId())
                    .or(() -> teacherRepository.findById(user.getUsername()))
                    .orElseThrow(() -> new RuntimeException("Thông tin giáo viên không tồn tại"));
            
            builder.teacherId(teacher.getId())
                    .fullName(teacher.getFullName());
        }

        return builder.build();
    }

    @Override
    public StudentLoginResponse login(String studentCode) {
        Student student = studentRepository.findByStudentCode(studentCode)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy học sinh với mã: " + studentCode));

        List<StudentClass> studentClasses = studentClassRepository.findByStudentId(student.getId());
        String className = "N/A";
        if (!studentClasses.isEmpty()) {
            StudentClass sc = studentClasses.get(studentClasses.size() - 1);
            SchoolClass schoolClass = resolveSchoolClassByIdOrName(sc.getClassId());
            if (schoolClass != null && schoolClass.getGradeLevel() != null && schoolClass.getClassName() != null) {
                className = ClassNameUtils.formatDisplayClassName(
                        schoolClass.getGradeLevel(),
                        schoolClass.getClassName()
                );
            } else if (sc.getClassId() != null && !sc.getClassId().isBlank()) {
                className = ClassNameUtils.formatDisplayClassName(sc.getClassId().trim());
            }
        }

        return StudentLoginResponse.builder()
                .studentId(student.getId())
                .studentCode(student.getStudentCode())
                .fullName(student.getFullName())
                .className(className)
                .build();
    }

    @Override
    public List<Map<String, Object>> getStudentSubjects(String studentId) {
        List<StudentClass> studentClasses = studentClassRepository.findByStudentId(studentId);
        if (studentClasses.isEmpty()) return Collections.emptyList();
        
        StudentClass sc = studentClasses.get(studentClasses.size() - 1);
        SchoolClass schoolClass = resolveSchoolClassByIdOrName(sc.getClassId());
        String className = null;
        if (schoolClass != null && schoolClass.getGradeLevel() != null && schoolClass.getClassName() != null) {
            className = ClassNameUtils.formatDisplayClassName(
                    schoolClass.getGradeLevel(),
                    schoolClass.getClassName()
            );
        } else if (sc.getClassId() != null && !sc.getClassId().isBlank()) {
            className = ClassNameUtils.formatDisplayClassName(sc.getClassId().trim());
        }
        if (className == null || className.isBlank()) return Collections.emptyList();

        final String studentClassKey = ClassNameUtils.normalizeToKey(className);
        List<TeachingAssignment> assignments = teachingAssignmentRepository.findAll().stream()
                .filter(a -> a.getClassName() != null
                        && ClassNameUtils.normalizeToKey(a.getClassName()).equals(studentClassKey))
                .collect(Collectors.toList());

        List<Map<String, Object>> result = new ArrayList<>();
        for (TeachingAssignment assignment : assignments) {
            Map<String, Object> map = new HashMap<>();
            map.put("assignmentId", assignment.getId());
            map.put("subjectName", assignment.getSubjectName());
            
            Teacher teacher = teacherRepository.findById(assignment.getTeacherId()).orElse(null);
            map.put("teacherName", teacher != null ? teacher.getFullName() : "N/A");

            List<AttendanceSession> sessions = attendanceSessionRepository.findByTeachingAssignmentId(assignment.getId());
            long totalSessions = sessions.size();
            long attendedSessions = sessions.stream()
                    .filter(s -> attendanceRepository.findByAttendanceSessionIdAndStudentId(s.getId(), studentId).isPresent())
                    .count();

            map.put("totalSessions", totalSessions);
            map.put("attendedSessions", attendedSessions);
            result.add(map);
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getAttendanceDetails(String studentId, String assignmentId) {
        List<AttendanceSession> sessions = attendanceSessionRepository.findByTeachingAssignmentId(assignmentId);
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (AttendanceSession session : sessions) {
            Map<String, Object> map = new HashMap<>();
            map.put("sessionId", session.getId());
            map.put("date", session.getDate());
            map.put("period", session.getPeriod());
            
            Optional<Attendance> attendanceOpt = attendanceRepository.findByAttendanceSessionIdAndStudentId(session.getId(), studentId);
            if (attendanceOpt.isPresent()) {
                Attendance attendance = attendanceOpt.get();
                map.put("status", attendance.getStatus());
                map.put("checkInTime", attendance.getCheckInTime());
                map.put("location", attendance.getLocation());
                map.put("note", attendance.getNote());
                map.put("attendanceType", attendance.getAttendanceType());
                map.put("isPresent", true);
            } else {
                map.put("isPresent", false);
                map.put("status", "ABSENT");
            }
            result.add(map);
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> getStudentsByClass(String className) {
        String raw = className == null ? "" : className.trim();
        String classKey = ClassNameUtils.normalizeToKey(raw);
        Integer gradeLevel = ClassNameUtils.parseGradeLevel(classKey);
        String classSimpleName = ClassNameUtils.parseClassSimpleName(classKey);

        // Prefer querying student_classes by label first. This is more tolerant of datasets where:
        // - "classes" rows are missing/inconsistent
        // - StudentClass.classId stores a human label (e.g. "10A1") instead of SchoolClass.id
        LinkedHashMap<String, StudentClass> unique = new LinkedHashMap<>();
        for (String candidate : buildClassIdCandidates(raw, classKey, gradeLevel, classSimpleName)) {
            if (candidate == null || candidate.isBlank()) continue;
            for (StudentClass sc : studentClassRepository.findByClassIdIgnoreCase(candidate)) {
                if (sc != null && sc.getId() != null) {
                    unique.putIfAbsent(sc.getId(), sc);
                }
            }
        }

        // If label lookups did not find anything, resolve SchoolClass and retry with its id.
        SchoolClass schoolClass = null;
        if (unique.isEmpty()) {
            schoolClass = resolveSchoolClassByIdOrName(raw);
            if (schoolClass != null && schoolClass.getId() != null) {
                for (StudentClass sc : studentClassRepository.findByClassId(schoolClass.getId())) {
                    if (sc != null && sc.getId() != null) {
                        unique.putIfAbsent(sc.getId(), sc);
                    }
                }
            }
        } else {
            // Best-effort resolve for display name.
            schoolClass = resolveSchoolClassByIdOrName(raw);
        }

        if (unique.isEmpty()) {
            log.debug("No students found for className='{}' (classKey='{}')", raw, classKey);
            return Collections.emptyList();
        }

        String displayClassName;
        if (schoolClass != null && schoolClass.getGradeLevel() != null && schoolClass.getClassName() != null) {
            displayClassName = ClassNameUtils.formatDisplayClassName(schoolClass.getGradeLevel(), schoolClass.getClassName());
        } else {
            displayClassName = ClassNameUtils.formatDisplayClassName(raw);
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (StudentClass sc : unique.values()) {
            Student student = sc == null ? null : studentRepository.findById(sc.getStudentId()).orElse(null);
            if (student == null) continue;

            Map<String, Object> studentMap = new HashMap<>();
            studentMap.put("studentId", student.getId());
            studentMap.put("studentCode", student.getStudentCode());
            studentMap.put("fullName", student.getFullName());
            studentMap.put("className", displayClassName);
            result.add(studentMap);
        }

        // Deterministic ordering for UI.
        result.sort(Comparator.comparing(m -> String.valueOf(m.getOrDefault("studentCode", ""))));
        return result;
    }

    private static List<String> buildClassIdCandidates(String raw, String classKey, Integer gradeLevel, String classSimpleName) {
        LinkedHashSet<String> out = new LinkedHashSet<>();
        if (raw != null && !raw.isBlank()) {
            out.add(raw.trim());
            out.add(raw.trim().replaceAll("\\s+", ""));
            out.add(ClassNameUtils.formatDisplayClassName(raw));
        }
        if (classKey != null && !classKey.isBlank()) {
            out.add(classKey);
        }
        if (gradeLevel != null && classSimpleName != null && !classSimpleName.isBlank()) {
            out.add(String.valueOf(gradeLevel) + classSimpleName);
            out.add(String.valueOf(gradeLevel) + classSimpleName.toUpperCase(Locale.ROOT));
        }
        return new ArrayList<>(out);
    }
}