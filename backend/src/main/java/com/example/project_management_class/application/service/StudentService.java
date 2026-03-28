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

import com.example.project_management_class.application.dto.LoginResponse;
import com.example.project_management_class.application.dto.StudentLoginResponse;
<<<<<<< HEAD
import com.example.project_management_class.domain.model.Attendance;

=======
<<<<<<< HEAD
import com.example.project_management_class.domain.model.Student;

import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
=======
import com.example.project_management_class.domain.model.Attendance;

>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
import java.util.List;
import java.util.Map;

public interface StudentService {
    LoginResponse login(String username, String password);
    StudentLoginResponse login(String studentCode);
    List<Map<String, Object>> getStudentSubjects(String studentId);
    List<Map<String, Object>> getAttendanceDetails(String studentId, String assignmentId);
<<<<<<< HEAD
=======
<<<<<<< HEAD
    void importStudentsFromExcel(MultipartFile file);
    ByteArrayInputStream exportStudentsToExcel();
    List<Student> getAllStudents();
    void deleteStudent(String id);
    Student getStudentById(String id);
    Student updateStudent(String id, Student student);
    Student createStudent(Student student);
}
=======
>>>>>>> remotes/origin/Update-UX/UI
    List<Map<String, Object>> getStudentsByClass(String className);
}



<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
