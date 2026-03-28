import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
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
    AddTeacherButton
} from "../../styles/TeachersStyles";

const TeacherSection = () =>{
    const [isOpen, setIsOpen] = useState(true);
<<<<<<< HEAD
    const [newTeacher, setNewTeacher] = useState({fullName: '', email: '', phone: ''});
=======
    const [newTeacher, setNewTeacher] = useState({name: '', email: '', subject: ''});
>>>>>>> fix-final
    const [teachers, setTeachers] = useState([]);
    const [editingTeacher, setEditingTeacher] = useState(null);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/teachers/getall');
            setTeachers(response.data.teachers || []);
        }catch (error){
            console.error('Error fetching teachers: ', error);
        }
    };

    const handleAddTeacher = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if(newTeacher.fullName.trim() !== '' && newTeacher.email.trim() !== ''){
            try{
                await axios.post('http://localhost:8080/api/v1/teachers', newTeacher);
                fetchTeachers(); 
                setNewTeacher({ fullName: '', email: '', phone: '' });
                alert('Teacher added!');
=======
        if(newTeacher.name.trim() !== '' && newTeacher.email.trim() !== '' && newTeacher.subject.trim() !== ''){
            try{
                await axios.post('http://localhost:8080/api/v1/teachers', newTeacher);
                fetchTeachers(); 
                setNewTeacher({ name: '', email: '', subject: '' });
>>>>>>> fix-final
            }catch (error){
                console.error("Error adding teacher: ", error);
            }
        }
    };

    const handleDeleteTeacher = async (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/teachers/${id}`);
                fetchTeachers();
            } catch (error) {
                console.error('Error deleting teacher: ', error);
            }
        }
    };

    const handleUpdateTeacher = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/teachers/${editingTeacher.id}`, editingTeacher);
            setEditingTeacher(null);
            fetchTeachers();
<<<<<<< HEAD
            alert('Teacher updated!');
=======
>>>>>>> fix-final
        } catch (error) {
            console.error('Error updating teacher: ', error);
        }
    };

    return(
        <TeachersContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <TeachersContent>
                    <TeachersHeader>Teachers Management</TeachersHeader>
                    
                    {editingTeacher ? (
                        <AddTeacherForm onSubmit={handleUpdateTeacher}>
                             <h3>Edit Teacher</h3>
                             <AddTeacherInput
                                type="text"
<<<<<<< HEAD
                                placeholder="Full Name"
                                value={editingTeacher.fullName}
                                onChange={(e) => setEditingTeacher({...editingTeacher, fullName: e.target.value})}
                            />
                            <AddTeacherInput
                                type="text"
                                placeholder="Email"
=======
                                value={editingTeacher.name}
                                onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})}
                            />
                            <AddTeacherInput
                                type="text"
>>>>>>> fix-final
                                value={editingTeacher.email}
                                onChange={(e) => setEditingTeacher({...editingTeacher, email: e.target.value})}
                            />
                            <AddTeacherInput
                                type="text"
<<<<<<< HEAD
                                placeholder="Phone"
                                value={editingTeacher.phone}
                                onChange={(e) => setEditingTeacher({...editingTeacher, phone: e.target.value})}
=======
                                value={editingTeacher.subject}
                                onChange={(e) => setEditingTeacher({...editingTeacher, subject: e.target.value})}
>>>>>>> fix-final
                            />
                            <AddTeacherButton type="submit">Update</AddTeacherButton>
                            <AddTeacherButton type="button" onClick={() => setEditingTeacher(null)} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Cancel</AddTeacherButton>
                        </AddTeacherForm>
                    ) : (
                        <AddTeacherForm onSubmit={handleAddTeacher}>
<<<<<<< HEAD
                            <h3>Add New Teacher</h3>
                            <AddTeacherInput
                                type="text"
                                placeholder="Enter Full Name"
                                value={newTeacher.fullName}
                                onChange={(e) => setNewTeacher({...newTeacher, fullName: e.target.value})}
                            />
                            <AddTeacherInput
                                type="text"
                                placeholder="Enter Email"
=======
                            <AddTeacherInput
                                type="text"
                                placeholder="Enter Teacher Name"
                                value={newTeacher.name}
                                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                            />
                            <AddTeacherInput
                                type="text"
                                placeholder="Enter Teacher Email"
>>>>>>> fix-final
                                value={newTeacher.email}
                                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                            />
                            <AddTeacherInput
                                type="text"
<<<<<<< HEAD
                                placeholder="Enter Phone"
                                value={newTeacher.phone}
                                onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
=======
                                placeholder="Enter Teacher Subject"
                                value={newTeacher.subject}
                                onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
>>>>>>> fix-final
                            />
                            <AddTeacherButton type="submit">Add Teacher</AddTeacherButton>
                        </AddTeacherForm>
                    )}

                    <TeacherList>
<<<<<<< HEAD
                        {Array.isArray(teachers) && teachers.map((teacher) => (
                            <TeacherItem key={teacher.id}>
                                <div>
                                    <strong>{teacher.fullName}</strong> - {teacher.email} {teacher.phone && `- ${teacher.phone}`}
=======
                        {teachers.map((teacher) => (
                            <TeacherItem key={teacher.id}>
                                <div>
                                    <strong>{teacher.name}</strong> - {teacher.email} - {teacher.subject}
>>>>>>> fix-final
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <button onClick={() => setEditingTeacher(teacher)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDeleteTeacher(teacher.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </TeacherItem>
                        ))}
                    </TeacherList>
                </TeachersContent>
            </Content>
        </TeachersContainer>
    )
}

export default TeacherSection