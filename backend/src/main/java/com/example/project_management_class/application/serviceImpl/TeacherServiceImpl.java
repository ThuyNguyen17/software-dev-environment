package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.TeacherService;
import com.example.project_management_class.domain.model.Teacher;
import com.example.project_management_class.domain.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final TeacherRepository teacherRepository;

    @Override
    public Teacher createTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public void deleteTeacher(String id) {
        teacherRepository.deleteById(id);
    }

    @Override
    public Teacher updateTeacher(String id, Teacher teacher) {
        teacher.setId(id);
        return teacherRepository.save(teacher);
    }
}
