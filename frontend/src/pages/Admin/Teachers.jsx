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

const Teachers = () =>{
    const [isOpen, setIsOpen] = useState(true);
    const [newTeacher, setNewTeacher] = useState({fullName: '', email: '', teacherCode: ''});
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try{
            const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
            setTeachers(response.data.teachers || []);
        }catch (error){
            console.error('Error fetching teachers: ', error);
        }
    };

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        if(newTeacher.fullName.trim() !== '' && newTeacher.email.trim() !== ''){
            try{
                const response = await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
                fetchTeachers(); // Refresh list
                setNewTeacher({ fullName: '', email: '', teacherCode: '' });
            }catch (error){
                console.error("Error adding teacher: ", error);
            }
        }
    };

    return(
        <TeachersContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <TeachersContent>
                    <TeachersHeader>
                        <AddTeacherForm onSubmit={handleAddTeacher}>
                            <AddTeacherInput
                                type="text"
                                placeholder="Enter Teacher Full Name"
                                value={newTeacher.fullName}
                                onChange={(e) => setNewTeacher({...newTeacher, fullName: e.target.value})}
                            />
                            <AddTeacherInput
                                type="email"
                                placeholder="Enter Teacher Email"
                                value={newTeacher.email}
                                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                            />
                            <AddTeacherInput
                                type="text"
                                placeholder="Enter Teacher Code"
                                value={newTeacher.teacherCode}
                                onChange={(e) => setNewTeacher({...newTeacher, teacherCode: e.target.value})}
                            />
                            <AddTeacherButton type="submit">Add Teacher</AddTeacherButton>
                        </AddTeacherForm>

                        <TeacherList>
                            {teachers.map((teacher) => (
                                <TeacherItem key={teacher.id}>{teacher.fullName} - {teacher.email} - {teacher.teacherCode}</TeacherItem>
                            ))}
                        </TeacherList>
                    </TeachersHeader>
                </TeachersContent>
            </Content>
        </TeachersContainer>
    )
}

export default Teachers;