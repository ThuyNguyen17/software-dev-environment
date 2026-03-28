<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI


















<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//package com.example.project_management_class.infrastructure.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.stereotype.Component;
//import org.bson.Document;
//import java.time.Instant;
//import java.util.Date;
<<<<<<< HEAD
//import java.util.ArrayList;
=======
<<<<<<< HEAD
=======
//import java.util.ArrayList;
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//public class AddData implements CommandLineRunner {
//
//    private final MongoTemplate mongoTemplate;
//
//    @Override
//    public void run(String... args) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
//
//        // Nếu đã có dữ liệu thì không seed lại
//        if (mongoTemplate.collectionExists("academic_years") &&
//                mongoTemplate.getCollection("academic_years").countDocuments() > 0) {
//            System.out.println("Data already exists. Skipping seed.");
//            return;
//        }
//
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//        System.out.println("Start seeding database...");
//
//        // ===== 1. Academic Year =====
//        mongoTemplate.dropCollection("academic_years");
//        Document academicYear = new Document()
//                .append("_id", "ay2025")
//                .append("name", "2025-2026")
<<<<<<< HEAD
//                .append("startDate", Date.from(Instant.parse("2025-09-01T00:00:00Z")));
=======
<<<<<<< HEAD
//                .append("startDate", Date.from(Instant.parse("2025-09-01T00:00:00Z")))
//                .append("endDate", Date.from(Instant.parse("2026-06-30T00:00:00Z")))
//                .append("active", true);
=======
//                .append("startDate", Date.from(Instant.parse("2025-09-01T00:00:00Z")));
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//
//        mongoTemplate.getCollection("academic_years").insertOne(academicYear);
//
//        // ===== 2. Classes =====
//        mongoTemplate.dropCollection("classes");
//        Document class10A1 = new Document()
//                .append("_id", "class10A1")
//                .append("academicYearId", "ay2025")
//                .append("gradeLevel", 10)
//                .append("className", "A1")
//                .append("homeroomTeacherId", "t1");
//
//        mongoTemplate.getCollection("classes").insertOne(class10A1);
//
//        // ===== 3. Teachers =====
//        mongoTemplate.dropCollection("teachers");
//        Document teacher = new Document()
//                .append("_id", "t1")
//                .append("fullName", "Phạm Văn C")
//                .append("userId", "u_teacher1");
//
//        mongoTemplate.getCollection("teachers").insertOne(teacher);
//
//        // ===== 4. Students =====
//        mongoTemplate.dropCollection("students");
//
//        List<Document> students = List.of(
//                new Document()
//                        .append("_id", "s1")
//                        .append("studentCode", "HS001")
//                        .append("fullName", "Nguyễn Văn A")
//                        .append("userId", "u_student1")
//                        .append("dateOfBirth", Date.from(Instant.parse("2009-05-15T00:00:00Z")))
//                        .append("gender", "Nam")
//                        .append("contact", new Document("phone", "0987654321")
//                                .append("email", "a.nv@example.com")),
//
//                new Document()
//                        .append("_id", "s2")
//                        .append("studentCode", "HS002")
//                        .append("fullName", "Trần Thị B")
//                        .append("userId", "u_student2")
//                        .append("dateOfBirth", Date.from(Instant.parse("2009-08-20T00:00:00Z")))
//                        .append("gender", "Nữ")
//                        .append("contact", new Document("phone", "0123456789")
//                                .append("email", "b.tt@example.com"))
//        );
//
//        mongoTemplate.getCollection("students").insertMany(students);
//
//        // ===== 5. Student Classes =====
//        mongoTemplate.dropCollection("student_classes");
//
//        List<Document> studentClasses = List.of(
//                new Document("_id", "sc1")
//                        .append("studentId", "s1")
//                        .append("classId", "class10A1")
//                        .append("academicYearId", "ay2025"),
//                new Document("_id", "sc2")
//                        .append("studentId", "s2")
//                        .append("classId", "class10A1")
//                        .append("academicYearId", "ay2025")
//        );
//
//        mongoTemplate.getCollection("student_classes").insertMany(studentClasses);
//
//        // ===== 6. Teaching Assignments =====
//        mongoTemplate.dropCollection("teaching_assignments");
//
//        List<Document> teachingAssignments = List.of(
//                new Document("_id", "ta1")
//                        .append("teacherId", "t1")
//                        .append("subjectName", "Toán Học")
//                        .append("className", "10A1")
<<<<<<< HEAD
//                        .append("academicYear", 2025)
//                        .append("semester", 2),
=======
<<<<<<< HEAD
//                        .append("academicYear", 2024)
//                        .append("semester", 1),
=======
//                        .append("academicYear", 2025)
//                        .append("semester", 2),
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//
//                new Document("_id", "ta2")
//                        .append("teacherId", "t1")
//                        .append("subjectName", "Vật Lý")
//                        .append("className", "10A1")
<<<<<<< HEAD
//                        .append("academicYear", 2025)
//                        .append("semester", 2)
=======
<<<<<<< HEAD
//                        .append("academicYear", 2024)
//                        .append("semester", 1)
=======
//                        .append("academicYear", 2025)
//                        .append("semester", 2)
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//        );
//
//        mongoTemplate.getCollection("teaching_assignments").insertMany(teachingAssignments);
//
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI
//        // ===== 6.1 Timetables =====
//        // Teacher timetable API relies on this collection; without it the UI will be empty.
//        mongoTemplate.dropCollection("timetables");
//
//        List<Document> timetables = new ArrayList<>();
//        for (int week = 1; week <= 18; week++) {
//            // ta1: Toan Hoc
//            timetables.add(new Document("_id", "tt_ta1_w" + week + "_mon_p1")
//                    .append("teachingAssignmentId", "ta1")
//                    .append("week", week)
//                    .append("dayOfWeek", "MONDAY")
//                    .append("period", 1)
//                    .append("room", "P101")
//                    .append("note", null));
//            timetables.add(new Document("_id", "tt_ta1_w" + week + "_wed_p2")
//                    .append("teachingAssignmentId", "ta1")
//                    .append("week", week)
//                    .append("dayOfWeek", "WEDNESDAY")
//                    .append("period", 2)
//                    .append("room", "P101")
//                    .append("note", null));
//            timetables.add(new Document("_id", "tt_ta1_w" + week + "_fri_p3")
//                    .append("teachingAssignmentId", "ta1")
//                    .append("week", week)
//                    .append("dayOfWeek", "FRIDAY")
//                    .append("period", 3)
//                    .append("room", "P101")
//                    .append("note", null));
//
//            // ta2: Vat Ly
//            timetables.add(new Document("_id", "tt_ta2_w" + week + "_tue_p4")
//                    .append("teachingAssignmentId", "ta2")
//                    .append("week", week)
//                    .append("dayOfWeek", "TUESDAY")
//                    .append("period", 4)
//                    .append("room", "P202")
//                    .append("note", null));
//            timetables.add(new Document("_id", "tt_ta2_w" + week + "_thu_p5")
//                    .append("teachingAssignmentId", "ta2")
//                    .append("week", week)
//                    .append("dayOfWeek", "THURSDAY")
//                    .append("period", 5)
//                    .append("room", "P202")
//                    .append("note", null));
//        }
//        mongoTemplate.getCollection("timetables").insertMany(timetables);
//
<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//        // ===== 7. Users =====
//        mongoTemplate.dropCollection("users");
//
//        List<Document> users = List.of(
//                new Document("_id", "u_student1")
//                        .append("username", "hs001")
//                        .append("password", "password123")
//                        .append("role", "STUDENT")
//                        .append("active", true),
//
//                new Document("_id", "u_student2")
//                        .append("username", "hs002")
//                        .append("password", "password123")
//                        .append("role", "STUDENT")
//                        .append("active", true),
//
//                new Document("_id", "u_teacher1")
//                        .append("username", "gv001")
//                        .append("password", "password123")
//                        .append("role", "TEACHER")
//                        .append("active", true)
//        );
//
//        mongoTemplate.getCollection("users").insertMany(users);
//
//        // ===== 8. Attendance Session =====
//        mongoTemplate.dropCollection("attendance_sessions");
//
//        Document attendanceSession = new Document()
//                .append("_id", "as1")
//                .append("teachingAssignmentId", "ta1")
//                .append("date", Date.from(Instant.parse("2026-02-24T00:00:00Z")))
<<<<<<< HEAD
//                .append("semester", 2)
=======
<<<<<<< HEAD
//                .append("semester", 1)
=======
//                .append("semester", 2)
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
//                .append("period", 1)
//                .append("open", true)
//                .append("qrToken", "TEST_TOKEN_123")
//                .append("previousQrToken", null);
//
//        mongoTemplate.getCollection("attendance_sessions").insertOne(attendanceSession);
//
//        System.out.println("Seed data inserted successfully!");
//    }
//}