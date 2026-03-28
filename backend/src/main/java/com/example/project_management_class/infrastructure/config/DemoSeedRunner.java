//package com.example.project_management_class.infrastructure.config;
//
//import com.example.project_management_class.domain.enums.DayOfWeek;
//import com.example.project_management_class.domain.enums.Role;
//import com.example.project_management_class.domain.model.SchoolClass;
//import com.example.project_management_class.domain.model.Student;
//import com.example.project_management_class.domain.model.StudentClass;
//import com.example.project_management_class.domain.model.Teacher;
//import com.example.project_management_class.domain.model.TeachingAssignment;
//import com.example.project_management_class.domain.model.Timetable;
//import com.example.project_management_class.domain.model.User;
//import com.example.project_management_class.domain.repository.SchoolClassRepository;
//import com.example.project_management_class.domain.repository.StudentClassRepository;
//import com.example.project_management_class.domain.repository.StudentRepository;
//import com.example.project_management_class.domain.repository.TeacherRepository;
//import com.example.project_management_class.domain.repository.TeachingAssignmentRepository;
//import com.example.project_management_class.domain.repository.TimetableRepository;
//import com.example.project_management_class.domain.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.stereotype.Component;
//
//import java.util.Locale;
//
//@Component
//@RequiredArgsConstructor
//@ConditionalOnProperty(prefix = "app", name = "demoSeed", havingValue = "true")
//public class DemoSeedRunner implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final TeacherRepository teacherRepository;
//    private final StudentRepository studentRepository;
//    private final SchoolClassRepository schoolClassRepository;
//    private final StudentClassRepository studentClassRepository;
//    private final TeachingAssignmentRepository teachingAssignmentRepository;
//    private final TimetableRepository timetableRepository;
//
//    @Override
//    public void run(String... args) {
//        // Keep this seed idempotent: only insert missing demo rows, do not drop collections.
//        String academicYearId = "ay2025";
//        int year = 2025;
//        int semester = 2;
//
//        User uTeacher1 = ensureUser("gv001", "password123", Role.TEACHER);
//        User uTeacher2 = ensureUser("gv002", "password123", Role.TEACHER);
//        User uStudent1 = ensureUser("hs001", "password123", Role.STUDENT);
//        User uStudent2 = ensureUser("hs002", "password123", Role.STUDENT);
//        User uStudent3 = ensureUser("hs003", "password123", Role.STUDENT);
//        User uStudent4 = ensureUser("hs004", "password123", Role.STUDENT);
//        User uStudentX = ensureUser("hs999", "password123", Role.STUDENT);
//
//        Teacher t1 = ensureTeacher(uTeacher1.getId(), "GV001", "Pham Van C");
//        Teacher t2 = ensureTeacher(uTeacher2.getId(), "GV002", "Le Thi D");
//
//        SchoolClass c10A1 = ensureClass(academicYearId, 10, "A1", t1.getId());
//        SchoolClass c10A2 = ensureClass(academicYearId, 10, "A2", t2.getId());
//        SchoolClass c11B1 = ensureClass(academicYearId, 11, "B1", t2.getId());
//
//        Student s1 = ensureStudent(uStudent1.getId(), "HS001", "Nguyen Van A");
//        Student s2 = ensureStudent(uStudent2.getId(), "HS002", "Tran Thi B");
//        Student s3 = ensureStudent(uStudent3.getId(), "HS003", "Do Van E");
//        Student s4 = ensureStudent(uStudent4.getId(), "HS004", "Pham Thi F");
//        Student sX = ensureStudent(uStudentX.getId(), "HS999", "Hoc Sinh Ngoai Lop");
//
//        ensureStudentClass(academicYearId, s1.getId(), c10A1.getId());
//        ensureStudentClass(academicYearId, s2.getId(), c10A1.getId());
//        ensureStudentClass(academicYearId, s3.getId(), c10A2.getId());
//        ensureStudentClass(academicYearId, s4.getId(), c10A2.getId());
//        ensureStudentClass(academicYearId, sX.getId(), c11B1.getId()); // for "not in class" demo
//
//        String class10A1 = "10A1";
//        String class10A2 = "10A2";
//
//        TeachingAssignment ta1 = ensureTeachingAssignment("demo_ta_t1_toan_10a1_2025_s2", t1.getId(), "Toan", class10A1, year, semester);
//        TeachingAssignment ta2 = ensureTeachingAssignment("demo_ta_t1_vatly_10a1_2025_s2", t1.getId(), "Vat Ly", class10A1, year, semester);
//        TeachingAssignment tb1 = ensureTeachingAssignment("demo_ta_t2_hoa_10a2_2025_s2", t2.getId(), "Hoa", class10A2, year, semester);
//        TeachingAssignment tb2 = ensureTeachingAssignment("demo_ta_t2_sinh_10a2_2025_s2", t2.getId(), "Sinh", class10A2, year, semester);
//
//        // Create a simple timetable for 18 weeks.
//        for (int week = 1; week <= 18; week++) {
//            ensureTimetableSlot(ta1.getId(), week, DayOfWeek.MONDAY, 1, "P101", null);
//            ensureTimetableSlot(ta1.getId(), week, DayOfWeek.WEDNESDAY, 2, "P101", null);
//            ensureTimetableSlot(ta2.getId(), week, DayOfWeek.TUESDAY, 3, "P202", null);
//
//            ensureTimetableSlot(tb1.getId(), week, DayOfWeek.MONDAY, 4, "P303", null);
//            ensureTimetableSlot(tb1.getId(), week, DayOfWeek.THURSDAY, 2, "P303", null);
//            ensureTimetableSlot(tb2.getId(), week, DayOfWeek.FRIDAY, 1, "P404", null);
//        }
//    }
//
//    private User ensureUser(String username, String password, Role role) {
//        return userRepository.findByUsername(username).orElseGet(() -> {
//            User u = new User();
//            u.setUsername(username);
//            u.setPassword(password);
//            u.setRole(role);
//            u.setActive(true);
//            return userRepository.save(u);
//        });
//    }
//
//    private Teacher ensureTeacher(String userId, String teacherCode, String fullName) {
//        return teacherRepository.findByUserId(userId).orElseGet(() -> {
//            Teacher t = new Teacher();
//            t.setUserId(userId);
//            t.setTeacherCode(teacherCode);
//            t.setFullName(fullName);
//            return teacherRepository.save(t);
//        });
//    }
//
//    private Student ensureStudent(String userId, String studentCode, String fullName) {
//        return studentRepository.findByUserId(userId).orElseGet(() -> {
//            Student s = new Student();
//            s.setUserId(userId);
//            s.setStudentCode(studentCode);
//            s.setFullName(fullName);
//            return studentRepository.save(s);
//        });
//    }
//
//    private SchoolClass ensureClass(String academicYearId, Integer gradeLevel, String className, String homeroomTeacherId) {
//        return schoolClassRepository.findByGradeLevelAndClassName(gradeLevel, className).orElseGet(() -> {
//            SchoolClass c = new SchoolClass();
//            c.setAcademicYearId(academicYearId);
//            c.setGradeLevel(gradeLevel);
//            c.setClassName(className);
//            c.setHomeroomTeacherId(homeroomTeacherId);
//            return schoolClassRepository.save(c);
//        });
//    }
//
//    private StudentClass ensureStudentClass(String academicYearId, String studentId, String classId) {
//        return studentClassRepository.findByStudentIdAndAcademicYearId(studentId, academicYearId).orElseGet(() -> {
//            StudentClass sc = new StudentClass();
//            sc.setAcademicYearId(academicYearId);
//            sc.setStudentId(studentId);
//            sc.setClassId(classId);
//            return studentClassRepository.save(sc);
//        });
//    }
//
//    private TeachingAssignment ensureTeachingAssignment(String id, String teacherId, String subject, String className, int academicYear, int semester) {
//        return teachingAssignmentRepository.findById(id).orElseGet(() -> {
//            TeachingAssignment ta = new TeachingAssignment();
//            ta.setId(id);
//            ta.setTeacherId(teacherId);
//            ta.setSubjectName(subject);
//            ta.setClassName(className);
//            ta.setAcademicYear(academicYear);
//            ta.setSemester(semester);
//            return teachingAssignmentRepository.save(ta);
//        });
//    }
//
//    private Timetable ensureTimetableSlot(String teachingAssignmentId, int week, DayOfWeek dayOfWeek, int period, String room, String note) {
//        String id = slug("demo_tt_" + teachingAssignmentId + "_w" + week + "_" + dayOfWeek + "_p" + period);
//        return timetableRepository.findById(id).orElseGet(() -> {
//            Timetable tt = new Timetable();
//            tt.setId(id);
//            tt.setTeachingAssignmentId(teachingAssignmentId);
//            tt.setWeek(week);
//            tt.setDayOfWeek(dayOfWeek);
//            tt.setPeriod(period);
//            tt.setRoom(room);
//            tt.setNote(note);
//            return timetableRepository.save(tt);
//        });
//    }
//
//    private static String slug(String in) {
//        String s = in.toLowerCase(Locale.ROOT);
//        s = s.replaceAll("[^a-z0-9]+", "_");
//        s = s.replaceAll("^_+|_+$", "");
//        return s;
//    }
//}
//
