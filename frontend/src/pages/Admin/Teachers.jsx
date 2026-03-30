import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TeachersContainer,
    Content,
    TeachersContent,
    TeachersHeader,
    TeacherList,
    TeacherItem,
    AddTeacherForm,
    AddTeacherInput,
    AddTeacherButton,
    ActionButtons,
    EditButton,
    DeleteButton,
    CancelButton,
    TeacherName,
    TeacherInfo
} from "../../styles/TeachersStyles";

const Teachers = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [newTeacher, setNewTeacher] = useState({ fullName: '', email: '', teacherCode: '' });
    const [teachers, setTeachers] = useState([]);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [editForm, setEditForm] = useState({ fullName: '', email: '', teacherCode: '' });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
            setTeachers(response.data.teachers || []);
        } catch (error) {
            console.error('Error fetching teachers: ', error);
        }
    };

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        if (newTeacher.fullName.trim() !== '' && newTeacher.email.trim() !== '') {
            try {
                await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
                fetchTeachers();
                setNewTeacher({ fullName: '', email: '', teacherCode: '' });
            } catch (error) {
                console.error("Error adding teacher: ", error);
            }
        }
    };

    const handleDeleteTeacher = async (id) => {
        if (window.confirm('B?n có ch?c ch?n mu?n xóa gi?ng viên này?')) {
            try {
                await axios.delete(`http://localhost:4000/api/v1/teachers/${id}`);
                fetchTeachers();
            } catch (error) {
                console.error("Error deleting teacher: ", error);
            }
        }
    };

    const startEdit = (teacher) => {
        setEditingTeacher(teacher.id);
        setEditForm({
            fullName: teacher.fullName,
            email: teacher.email,
            teacherCode: teacher.teacherCode
        });
    };

    const cancelEdit = () => {
        setEditingTeacher(null);
        setEditForm({ fullName: '', email: '', teacherCode: '' });
    };

    const handleUpdateTeacher = async (e, id) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/v1/teachers/${id}`, editForm);
            fetchTeachers();
            setEditingTeacher(null);
        } catch (error) {
            console.error("Error updating teacher: ", error);
        }
    };

    return (
        <TeachersContainer>
            <Content isOpen={isOpen}>
                <TeachersContent>
                    <TeachersHeader>Qu?n lý Gi?ng viên</TeachersHeader>

                    <AddTeacherForm onSubmit={handleAddTeacher}>
                        <AddTeacherInput
                            type="text"
                            placeholder="H? tên gi?ng viên"
                            value={newTeacher.fullName}
                            onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })}
                        />
                        <AddTeacherInput
                            type="email"
                            placeholder="Email"
                            value={newTeacher.email}
                            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                        />
                        <AddTeacherInput
                            type="text"
                            placeholder="Mã gi?ng viên"
                            value={newTeacher.teacherCode}
                            onChange={(e) => setNewTeacher({ ...newTeacher, teacherCode: e.target.value })}
                        />
                        <AddTeacherButton type="submit">Thêm gi?ng viên</AddTeacherButton>
                    </AddTeacherForm>

                    <TeacherList>
                        {teachers.map((teacher) => (
                            <TeacherItem key={teacher.id}>
                                {editingTeacher === teacher.id ? (
                                    <form onSubmit={(e) => handleUpdateTeacher(e, teacher.id)}>
                                        <AddTeacherInput
                                            type="text"
                                            value={editForm.fullName}
                                            onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        />
                                        <AddTeacherInput
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        />
                                        <AddTeacherInput
                                            type="text"
                                            value={editForm.teacherCode}
                                            onChange={(e) => setEditForm({ ...editForm, teacherCode: e.target.value })}
                                        />
                                        <ActionButtons>
                                            <AddTeacherButton type="submit">Luu</AddTeacherButton>
                                            <CancelButton type="button" onClick={cancelEdit}>H?y</CancelButton>
                                        </ActionButtons>
                                    </form>
                                ) : (
                                    <>
                                        <TeacherName>{teacher.fullName}</TeacherName>
                                        <TeacherInfo>Email: {teacher.email}</TeacherInfo>
                                        <TeacherInfo>Mã GV: {teacher.teacherCode}</TeacherInfo>
                                        <ActionButtons>
                                            <EditButton onClick={() => startEdit(teacher)}>S?a</EditButton>
                                            <DeleteButton onClick={() => handleDeleteTeacher(teacher.id)}>Xóa</DeleteButton>
                                        </ActionButtons>
                                    </>
                                )}
                            </TeacherItem>
                        ))}
                    </TeacherList>
                </TeachersContent>
            </Content>
        </TeachersContainer>
    );
};

export default Teachers;