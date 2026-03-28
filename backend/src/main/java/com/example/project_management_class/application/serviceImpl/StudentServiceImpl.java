package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.StudentService;
import com.example.project_management_class.application.dto.LoginResponse;
import com.example.project_management_class.application.dto.StudentLoginResponse;
import com.example.project_management_class.domain.enums.Role;
import com.example.project_management_class.domain.model.*;
import com.example.project_management_class.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.ZoneId;
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
                SchoolClass schoolClass = schoolClassRepository.findById(sc.getClassId()).orElse(null);
                if (schoolClass != null) {
                    builder.className(schoolClass.getGradeLevel() + schoolClass.getClassName());
                }
            }
        } else if (user.getRole() == Role.LECTURER) {
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
            SchoolClass schoolClass = schoolClassRepository.findById(sc.getClassId()).orElse(null);
            if (schoolClass != null) {
                className = schoolClass.getGradeLevel() + schoolClass.getClassName();
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
        SchoolClass schoolClass = schoolClassRepository.findById(sc.getClassId()).orElse(null);
        if (schoolClass == null) return Collections.emptyList();
        
        String className = schoolClass.getGradeLevel() + schoolClass.getClassName();

        List<TeachingAssignment> assignments = teachingAssignmentRepository.findAll().stream()
                .filter(a -> a.getClassName() != null && a.getClassName().equalsIgnoreCase(className))
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
    public void importStudentsFromExcel(MultipartFile file) {
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                if (rowNumber == 0) {
                    rowNumber++;
                    continue; // Skip header row
                }

                String studentCode = getCellValueSafely(currentRow.getCell(0));
                String fullName = getCellValueSafely(currentRow.getCell(1));
                String gender = getCellValueSafely(currentRow.getCell(3));
                String phone = getCellValueSafely(currentRow.getCell(4));
                String email = getCellValueSafely(currentRow.getCell(5));
                String address = getCellValueSafely(currentRow.getCell(6));

                if (studentCode.isEmpty() || fullName.isEmpty()) {
                    continue; // Skip invalid rows
                }

                Student student = studentRepository.findByStudentCode(studentCode).orElse(new Student());
                student.setStudentCode(studentCode);
                student.setFullName(fullName);
                student.setGender(gender);

                if (currentRow.getCell(2) != null && currentRow.getCell(2).getCellType() == CellType.NUMERIC) {
                    student.setDateOfBirth(currentRow.getCell(2).getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
                }

                Contact contact = student.getContact() != null ? student.getContact() : new Contact();
                contact.setPhone(phone);
                contact.setEmail(email);
                contact.setAddress(address);
                student.setContact(contact);

                studentRepository.save(student);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to read Excel data: " + e.getMessage());
        }
    }

    private String getCellValueSafely(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }

    @Override
    public ByteArrayInputStream exportStudentsToExcel() {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Students");

            // Header
            Row headerRow = sheet.createRow(0);
            String[] columns = {"Mã SV", "Họ Tên", "Ngày Sinh", "Giới Tính", "Số Điện Thoại", "Email", "Địa Chỉ"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            // Data
            List<Student> students = studentRepository.findAll();
            int rowIdx = 1;
            for (Student student : students) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(student.getStudentCode() != null ? student.getStudentCode() : "");
                row.createCell(1).setCellValue(student.getFullName() != null ? student.getFullName() : "");
                
                if (student.getDateOfBirth() != null) {
                    row.createCell(2).setCellValue(student.getDateOfBirth().toString());
                } else {
                    row.createCell(2).setCellValue("");
                }
                
                row.createCell(3).setCellValue(student.getGender() != null ? student.getGender() : "");

                if (student.getContact() != null) {
                    row.createCell(4).setCellValue(student.getContact().getPhone() != null ? student.getContact().getPhone() : "");
                    row.createCell(5).setCellValue(student.getContact().getEmail() != null ? student.getContact().getEmail() : "");
                    row.createCell(6).setCellValue(student.getContact().getAddress() != null ? student.getContact().getAddress() : "");
                } else {
                    row.createCell(4).setCellValue("");
                    row.createCell(5).setCellValue("");
                    row.createCell(6).setCellValue("");
                }
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to export data to Excel: " + e.getMessage());
        }
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
