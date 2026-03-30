import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    StudentsContainer,
    Content,
    StudentsContent,
    StudentsHeader,
    StudentList,
    StudentItem,
    StudentName,
    StudentCode,
    AddStudentForm,
    AddStudentInput,
    AddStudentButton,
    StudentActions,
    PrimaryButton,
    DangerButton,
    EditButton,
    CancelButton,
    Select,
    ClassBadge
} from "../../styles/StudentsStyles";

const Students = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [newStudent, setNewStudent] = useState({ fullName: '', studentCode: '', grade: '', classId: '' });
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [editForm, setEditForm] = useState({ fullName: '', studentCode: '', grade: '', classId: '' });

    useEffect(() => {
        fetchStudents();
        fetchClasses();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/students');
            setStudents(response.data || []);
        } catch (error) {
            console.error('Error fetching students: ', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/class/getall');
            setClasses(response.data.classes || []);
        } catch (error) {
            console.error('Error fetching classes: ', error);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (newStudent.fullName.trim() !== '' && newStudent.studentCode.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:4000/api/students', newStudent);
                setStudents([...students, response.data]);
                setNewStudent({ fullName: '', studentCode: '', grade: '', classId: '' });
            } catch (error) {
                console.error("Error adding student: ", error);
            }
        }
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm('B?n có ch?c ch?n mu?n xóa sinh viên này?')) {
            try {
                await axios.delete(`http://localhost:4000/api/students/${id}`);
                fetchStudents();
            } catch (error) {
                console.error("Error deleting student: ", error);
            }
        }
    };

    const startEdit = (student) => {
        setEditingStudent(student.id);
        setEditForm({
            fullName: student.fullName,
            studentCode: student.studentCode,
            grade: student.grade,
            classId: student.classId || ''
        });
    };

    const cancelEdit = () => {
        setEditingStudent(null);
        setEditForm({ fullName: '', studentCode: '', grade: '', classId: '' });
    };

    const handleUpdateStudent = async (e, id) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/students/${id}`, editForm);
            fetchStudents();
            setEditingStudent(null);
        } catch (error) {
            console.error("Error updating student: ", error);
        }
    };

    const getClassName = (classId) => {
        const cls = classes.find(c => c.id === classId);
        return cls ? cls.grade : 'Chua phân l?p';
    };

    return (
        <StudentsContainer>
            <Content isOpen={isOpen}>
                <StudentsContent>
                    <StudentsHeader>Qu?n lý Sinh viên</StudentsHeader>

                    <AddStudentForm onSubmit={handleAddStudent}>
                        <AddStudentInput
                            type="text"
                            placeholder="H? tên sinh viên"
                            value={newStudent.fullName}
                            onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                        />
                        <AddStudentInput
                            type="text"
                            placeholder="Mã sinh viên"
                            value={newStudent.studentCode}
                            onChange={(e) => setNewStudent({ ...newStudent, studentCode: e.target.value })}
                        />
                        <AddStudentInput
                            type="text"
                            placeholder="Khóa/Khoa"
                            value={newStudent.grade}
                            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                        />
                        <Select
                            value={newStudent.classId}
                            onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
                        >
                            <option value="">Ch?n l?p</option>
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>{cls.grade}</option>
                            ))}
                        </Select>
                        <AddStudentButton type="submit">Thêm sinh viên</AddStudentButton>
                    </AddStudentForm>

                    <StudentList>
                        {students.map((student) => (
                            <StudentItem key={student.id}>
                                {editingStudent === student.id ? (
                                    <form onSubmit={(e) => handleUpdateStudent(e, student.id)}>
                                        <AddStudentInput
                                            type="text"
                                            value={editForm.fullName}
                                            onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        />
                                        <AddStudentInput
                                            type="text"
                                            value={editForm.studentCode}
                                            onChange={(e) => setEditForm({ ...editForm, studentCode: e.target.value })}
                                        />
                                        <AddStudentInput
                                            type="text"
                                            value={editForm.grade}
                                            onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                                        />
                                        <Select
                                            value={editForm.classId}
                                            onChange={(e) => setEditForm({ ...editForm, classId: e.target.value })}
                                        >
                                            <option value="">Ch?n l?p</option>
                                            {classes.map((cls) => (
                                                <option key={cls.id} value={cls.id}>{cls.grade}</option>
                                            ))}
                                        </Select>
                                        <StudentActions>
                                            <PrimaryButton type="submit">Luu</PrimaryButton>
                                            <CancelButton type="button" onClick={cancelEdit}>H?y</CancelButton>
                                        </StudentActions>
                                    </form>
                                ) : (
                                    <>
                                        <StudentName>{student.fullName}</StudentName>
                                        <StudentCode>Mã SV: {student.studentCode}</StudentCode>
                                        <StudentCode>Khóa: {student.grade}</StudentCode>
                                        <ClassBadge>L?p: {getClassName(student.classId)}</ClassBadge>
                                        <StudentActions>
                                            <EditButton onClick={() => startEdit(student)}>S?a</EditButton>
                                            <DangerButton onClick={() => handleDeleteStudent(student.id)}>Xóa</DangerButton>
                                        </StudentActions>
                                    </>
                                )}
                            </StudentItem>
                        ))}
                    </StudentList>
                </StudentsContent>
            </Content>
        </StudentsContainer>
    );
};

export default Students;