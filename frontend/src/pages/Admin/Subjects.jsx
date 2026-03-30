import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    SubjectsContainer,
    Content,
    SubjectsContent,
    SubjectsHeader,
    SubjectList,
    SubjectItem,
    SubjectName,
    SubjectCode,
    SubjectCredits,
    AddSubjectForm,
    AddSubjectInput,
    AddSubjectButton,
    ActionButtons,
    EditButton,
    DeleteButton,
    CancelButton
} from "../../styles/SubjectsStyles";

const Subjects = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState({ name: '', code: '', credits: '' });
    const [editingSubject, setEditingSubject] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', code: '', credits: '' });

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/subjects/getall');
            setSubjects(response.data.subjects || []);
        } catch (error) {
            console.error('Error fetching subjects: ', error);
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        if (newSubject.name.trim() !== '' && newSubject.code.trim() !== '') {
            try {
                await axios.post('http://localhost:8080/api/v1/subjects', newSubject);
                fetchSubjects();
                setNewSubject({ name: '', code: '', credits: '' });
            } catch (error) {
                console.error("Error adding subject: ", error);
            }
        }
    };

    const handleDeleteSubject = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa môn học này?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/subjects/${id}`);
                fetchSubjects();
            } catch (error) {
                console.error("Error deleting subject: ", error);
            }
        }
    };

    const startEdit = (subject) => {
        setEditingSubject(subject.id);
        setEditForm({
            name: subject.name,
            code: subject.code,
            credits: subject.credits
        });
    };

    const cancelEdit = () => {
        setEditingSubject(null);
        setEditForm({ name: '', code: '', credits: '' });
    };

    const handleUpdateSubject = async (e, id) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/subjects/${id}`, editForm);
            fetchSubjects();
            setEditingSubject(null);
        } catch (error) {
            console.error("Error updating subject: ", error);
        }
    };

    return (
        <SubjectsContainer>
            <Content isOpen={isOpen}>
                <SubjectsContent>
                    <SubjectsHeader>Quản lý môn học</SubjectsHeader>
                    
                    <AddSubjectForm onSubmit={handleAddSubject}>
                        <AddSubjectInput
                            type="text"
                            placeholder="Tên môn học"
                            value={newSubject.name}
                            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                        />
                        <AddSubjectInput
                            type="text"
                            placeholder="Mã môn học"
                            value={newSubject.code}
                            onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                        />
                        <AddSubjectInput
                            type="number"
                            placeholder="Số tín chỉ"
                            value={newSubject.credits}
                            onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
                        />
                        <AddSubjectButton type="submit">Thêm môn học</AddSubjectButton>
                    </AddSubjectForm>

                    <SubjectList>
                        {subjects.map((subject) => (
                            <SubjectItem key={subject.id}>
                                {editingSubject === subject.id ? (
                                    <form onSubmit={(e) => handleUpdateSubject(e, subject.id)}>
                                        <AddSubjectInput
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        />
                                        <AddSubjectInput
                                            type="text"
                                            value={editForm.code}
                                            onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                                        />
                                        <AddSubjectInput
                                            type="number"
                                            value={editForm.credits}
                                            onChange={(e) => setEditForm({ ...editForm, credits: e.target.value })}
                                        />
                                        <ActionButtons>
                                            <AddSubjectButton type="submit">Lưu</AddSubjectButton>
                                            <CancelButton type="button" onClick={cancelEdit}>Hủy</CancelButton>
                                        </ActionButtons>
                                    </form>
                                ) : (
                                    <>
                                        <SubjectName>{subject.name}</SubjectName>
                                        <SubjectCode>Mã: {subject.code}</SubjectCode>
                                        <SubjectCredits>{subject.credits} tín chỉ</SubjectCredits>
                                        <ActionButtons>
                                            <EditButton onClick={() => startEdit(subject)}>Sửa</EditButton>
                                            <DeleteButton onClick={() => handleDeleteSubject(subject.id)}>Xóa</DeleteButton>
                                        </ActionButtons>
                                    </>
                                )}
                            </SubjectItem>
                        ))}
                    </SubjectList>
                </SubjectsContent>
            </Content>
        </SubjectsContainer>
    );
};

export default Subjects;
