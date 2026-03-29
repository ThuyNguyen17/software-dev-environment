import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    StudentsContainer,
    Content,
    StudentsContent,
    StudentsHeader,
    StudentList,
    StudentItem,
    AddStudentForm,
    AddStudentInput,
    AddStudentButton,
} from "../../styles/StudentsStyles";

const Students = () =>{
    const [isOpen, setIsOpen] = useState(true);
    const [newStudent, setNewStudent] = useState({fullName: '', studentCode: ''});
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/students');
            setStudents(response.data || []);
        }catch (error){
            console.error('Error fetching students: ', error);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if(newStudent.fullName.trim() !== '' && newStudent.studentCode.trim() !== ''){
            try{
                const response = await axios.post('http://localhost:8080/api/students', newStudent);
                setStudents([...students, response.data]);
                setNewStudent({ fullName: '', studentCode: '' });
                alert('Student added!');
            }catch (error){
                console.error("Error adding student: ", error);
            }
        }
    };

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        if (editingStudent.fullName.trim() !== '' && editingStudent.studentCode.trim() !== '') {
            try {
                await axios.put(`http://localhost:8080/api/students/${editingStudent.id}`, editingStudent);
                fetchStudents();
                setEditingStudent(null);
                alert('Student updated!');
            } catch (error) {
                console.error('Error updating student: ', error);
            }
        }
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:8080/api/students/${id}`);
                fetchStudents();
            } catch (error) {
                console.error("Error deleting student: ", error);
            }
        }
    };

    return(
        <StudentsContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <StudentsContent>
                    <StudentsHeader>Students</StudentsHeader>
                    
                    {editingStudent ? (
                        <AddStudentForm onSubmit={handleUpdateStudent}>
                            <h3>Edit Student</h3>
                            <AddStudentInput 
                                type="text"
                                placeholder="Full Name"
                                value={editingStudent.fullName}
                                onChange={(e) => setEditingStudent({ ...editingStudent, fullName: e.target.value })}
                                required
                            />
                            <AddStudentInput 
                                type="text"
                                placeholder="Student Code"
                                value={editingStudent.studentCode}
                                onChange={(e) => setEditingStudent({ ...editingStudent, studentCode: e.target.value })}
                                required
                            />
                            <AddStudentButton type="submit">Update Student</AddStudentButton>
                            <AddStudentButton type="button" onClick={() => setEditingStudent(null)} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Cancel</AddStudentButton>
                        </AddStudentForm>
                    ) : (
                        <AddStudentForm onSubmit={handleAddStudent}>
                            <h3>Add New Student</h3>
                            <AddStudentInput 
                                type="text"
                                placeholder="Enter Student Full Name"
                                value={newStudent.fullName}
                                onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                                required
                            />
                            <AddStudentInput 
                                type="text"
                                placeholder="Enter Student Code"
                                value={newStudent.studentCode}
                                onChange={(e) => setNewStudent({ ...newStudent, studentCode: e.target.value })}
                                required
                            />
                            <AddStudentButton type="submit">Add Student</AddStudentButton>
                        </AddStudentForm>
                    )}

                    <StudentList>
                        {Array.isArray(students) && students.map((student) => (
                            <StudentItem key={student.id}>
                                <div>
                                    <strong>{student.fullName}</strong> - {student.studentCode}
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <button onClick={() => setEditingStudent(student)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>Edit</button>
                                    <button onClick={() => handleDeleteStudent(student.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </StudentItem>
                        ))}
                    </StudentList>
                </StudentsContent>
            </Content>
        </StudentsContainer>
    )
}

export default Students;