package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.StudentService;
import com.example.project_management_class.application.util.ClassNameUtils;
import com.example.project_management_class.application.dto.LoginResponse;
import com.example.project_management_class.application.dto.StudentLoginResponse;
import com.example.project_management_class.domain.enums.Role;
import com.example.project_management_class.domain.model.*;
import com.example.project_management_class.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final StudentClassRepository studentClassRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final AttendanceSessionRepository attendanceSessionRepository;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

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

    @Override
    public LoginResponse login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Sai tài khoản hoặc mật khẩu"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Sai tài khoản hoặc mật khẩu");
        }

        LoginResponse.LoginResponseBuilder builder = LoginResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .role(user.getRole());

        if (user.getRole() == Role.STUDENT) {
            Student student = studentRepository.findByUserId(user.getId())
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
                    builder.className(schoolClass.getGradeLevel() + schoolClass.getClassName());
                } else if (sc.getClassId() != null && !sc.getClassId().isBlank()) {
                    builder.className(sc.getClassId().trim());
                }
            }
        } else if (user.getRole() == Role.TEACHER) {
            Teacher teacher = teacherRepository.findByUserId(user.getId())
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
                className = schoolClass.getGradeLevel() + schoolClass.getClassName();
            } else if (sc.getClassId() != null && !sc.getClassId().isBlank()) {
                className = sc.getClassId().trim();
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
            className = schoolClass.getGradeLevel() + schoolClass.getClassName();
        } else if (sc.getClassId() != null && !sc.getClassId().isBlank()) {
            className = sc.getClassId().trim();
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
        System.out.println("DEBUG: Getting students for class: " + className);
        
        String classKey = ClassNameUtils.normalizeToKey(className);
        Integer gradeLevel = ClassNameUtils.parseGradeLevel(classKey);
        String classSimpleName = ClassNameUtils.parseClassSimpleName(classKey);
        
        System.out.println("DEBUG: Extracted gradeLevel: '" + gradeLevel + "', classSimpleName: '" + classSimpleName + "'");
        
        // Find the school class
        SchoolClass schoolClass = (gradeLevel == null || classSimpleName == null || classSimpleName.isBlank())
                ? null
                : schoolClassRepository.findByGradeLevelAndClassNameIgnoreCase(gradeLevel, classSimpleName).orElse(null);
        
        System.out.println("DEBUG: Found schoolClass: " + (schoolClass != null ? schoolClass.getId() : "null"));
        
        if (schoolClass == null) {
            return Collections.emptyList();
        }
        
        // Get all students in this class
        List<StudentClass> studentClasses = studentClassRepository.findByClassId(schoolClass.getId());
        if (studentClasses.isEmpty()) {
            // Backward-compat: StudentClass.classId stored as "10A1" (or similar) instead of SchoolClass.id.
            String display = String.valueOf(gradeLevel) + classSimpleName;
            studentClasses = studentClassRepository.findByClassIdIgnoreCase(display);
            if (studentClasses.isEmpty()) {
                studentClasses = studentClassRepository.findByClassIdIgnoreCase(classKey);
            }
        }
        System.out.println("DEBUG: Found " + studentClasses.size() + " student classes");
        
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (StudentClass sc : studentClasses) {
            Student student = studentRepository.findById(sc.getStudentId()).orElse(null);
            if (student != null) {
                Map<String, Object> studentMap = new HashMap<>();
                studentMap.put("studentId", student.getId());
                studentMap.put("studentCode", student.getStudentCode());
                studentMap.put("fullName", student.getFullName());
                studentMap.put("className", gradeLevel + classSimpleName.toUpperCase(Locale.ROOT));
                result.add(studentMap);
                System.out.println("DEBUG: Added student: " + student.getFullName());
            }
        }
        
        System.out.println("DEBUG: Returning " + result.size() + " students");
        return result;
    }
}
