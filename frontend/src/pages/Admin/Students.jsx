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
    const [newStudent, setNewStudent] = useState({fullName: '', studentCode: '', grade: ''});
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try{
            const response = await axios.get('http://localhost:4000/api/students');
            // From cuatoi backend, response is just a List<Student>
            setStudents(response.data);
        }catch (error){
            console.error('Error fetching students: ', error);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if(newStudent.fullName.trim() !== '' && newStudent.studentCode.trim() !== ''){
            try{
                const response = await axios.post('http://localhost:4000/api/students', newStudent);
                console.log('Response data: ', response.data)
                setStudents([...students, response.data]);
                setNewStudent({ fullName: '', studentCode: '', grade: '' });
            }catch (error){
                console.error("Error adding student: ", error);
            }
        }
    };

    return(
        <StudentsContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <StudentsContent>
                    <StudentsHeader>
                        <AddStudentForm onSubmit={handleAddStudent}>
                        <AddStudentInput 
                            type="Text"
                            placeholder="Enter Student Full Name"
                            value={newStudent.fullName}
                            onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                        />
                        <AddStudentInput 
                            type="Text"
                            placeholder="Enter Student Code"
                            value={newStudent.studentCode}
                            onChange={(e) => setNewStudent({ ...newStudent, studentCode: e.target.value })}
                        />
                        <AddStudentInput 
                            type="Text"
                            placeholder="Enter Grade" 
                            value={newStudent.grade}
                            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                        />
                        <AddStudentButton type="submit">Add Student</AddStudentButton>
                        </AddStudentForm>

                        <StudentList>
                            {students.map((student) => (
                                <StudentItem key={student.id}>{student.fullName} - {student.studentCode} - {student.grade}</StudentItem>
                            ))}
                        </StudentList>
                    </StudentsHeader>       
                </StudentsContent>
            </Content>
        </StudentsContainer>
    )
}

export default Students;