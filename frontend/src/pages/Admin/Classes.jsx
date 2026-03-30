import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ClassesContainer,
    Content,
    ClassesContent,
    ClassHeader,
    ClassList,
    ClassItem,
    AddClassButton,
    AddClassForm,
    AddClassInput,
    ActionButtons,
    EditButton,
    DeleteButton,
    CancelButton
} from "../../styles/ClassesStyles";

const Classes = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [newClassName, setNewClassName] = useState('');
    const [classes, setClasses] = useState([]);
    const [editingClass, setEditingClass] = useState(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/class/getall');
            setClasses(response.data.classes || []);
        } catch (error) {
            console.error('Error fetching classes: ', error);
        }
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
        if (newClassName.trim() !== '') {
            try {
                await axios.post('http://localhost:8080/api/v1/class', { grade: newClassName });
                fetchClasses();
                setNewClassName('');
            } catch (error) {
                console.error("Error adding class: ", error);
            }
        }
    };

    const handleDeleteClass = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa lớp này?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/class/${id}`);
                fetchClasses();
            } catch (error) {
                console.error("Error deleting class: ", error);
            }
        }
    };

    const startEdit = (cls) => {
        setEditingClass(cls.id);
        setEditName(cls.grade);
    };

    const cancelEdit = () => {
        setEditingClass(null);
        setEditName('');
    };

    const handleUpdateClass = async (e, id) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/class/${id}`, { grade: editName });
            fetchClasses();
            setEditingClass(null);
        } catch (error) {
            console.error("Error updating class: ", error);
        }
    };

    return (
        <ClassesContainer>
            <Content isOpen={isOpen}>
                <ClassesContent>
                    <ClassHeader>Quản lý Lớp học</ClassHeader>
                    <AddClassForm onSubmit={handleAddClass}>
                        <AddClassInput
                            type="text"
                            placeholder="Tên lớp"
                            value={newClassName}
                            onChange={(e) => setNewClassName(e.target.value)}
                        />
                        <AddClassButton type="submit">Thêm lớp</AddClassButton>
                    </AddClassForm>
                    <ClassList>
                        {classes.map((cls) => (
                            <ClassItem key={cls.id}>
                                {editingClass === cls.id ? (
                                    <form onSubmit={(e) => handleUpdateClass(e, cls.id)}>
                                        <AddClassInput
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        />
                                        <ActionButtons>
                                            <AddClassButton type="submit">Lưu</AddClassButton>
                                            <CancelButton type="button" onClick={cancelEdit}>Hủy</CancelButton>
                                        </ActionButtons>
                                    </form>
                                ) : (
                                    <>
                                        <h3>{cls.grade}</h3>
                                        <ActionButtons>
                                            <EditButton onClick={() => startEdit(cls)}>Sửa</EditButton>
                                            <DeleteButton onClick={() => handleDeleteClass(cls.id)}>Xóa</DeleteButton>
                                        </ActionButtons>
                                    </>
                                )}
                            </ClassItem>
                        ))}
                    </ClassList>
                </ClassesContent>
            </Content>
        </ClassesContainer>
    );
};

export default Classes;