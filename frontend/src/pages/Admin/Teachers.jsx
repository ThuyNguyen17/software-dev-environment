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
<<<<<<< HEAD
            const response = await axios.get('http://localhost:8080/api/v1/teachers/getall');
=======
            const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
>>>>>>> fix-final
            setTeachers(response.data.teachers || []);
        }catch (error){
            console.error('Error fetching teachers: ', error);
        }
    };

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        if(newTeacher.fullName.trim() !== '' && newTeacher.email.trim() !== ''){
            try{
<<<<<<< HEAD
                await axios.post('http://localhost:8080/api/v1/teachers', newTeacher);
=======
                const response = await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
>>>>>>> fix-final
                fetchTeachers(); // Refresh list
                setNewTeacher({ fullName: '', email: '', teacherCode: '' });
            }catch (error){
                console.error("Error adding teacher: ", error);
            }
        }
    };

<<<<<<< HEAD
    const handleDeleteTeacher = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/teachers/${id}`);
            fetchTeachers();
        } catch (error) {
            console.error("Error deleting teacher: ", error);
        }
    };

=======
>>>>>>> fix-final
    return(
        <TeachersContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <TeachersContent>
<<<<<<< HEAD
                    <TeachersHeader>Teachers</TeachersHeader>
                    <AddTeacherForm onSubmit={handleAddTeacher}>
                        <AddTeacherInput
                            type="text"
                            placeholder="Enter Teacher Full Name"
                            value={newTeacher.fullName}
                            onChange={(e) => setNewTeacher({...newTeacher, fullName: e.target.value})}
                            required
                        />
                        <AddTeacherInput
                            type="email"
                            placeholder="Enter Teacher Email"
                            value={newTeacher.email}
                            onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                            required
                        />
                        <AddTeacherInput
                            type="text"
                            placeholder="Enter Teacher Code"
                            value={newTeacher.teacherCode}
                            onChange={(e) => setNewTeacher({...newTeacher, teacherCode: e.target.value})}
                            required
                        />
                        <AddTeacherButton type="submit">Add Teacher</AddTeacherButton>
                    </AddTeacherForm>

                    <TeacherList>
                        {teachers.map((teacher) => (
                            <TeacherItem key={teacher.id}>
                                {teacher.fullName} - {teacher.email} - {teacher.teacherCode}
                                <button onClick={() => handleDeleteTeacher(teacher.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                            </TeacherItem>
                        ))}
                    </TeacherList>
=======
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
>>>>>>> fix-final
                </TeachersContent>
            </Content>
        </TeachersContainer>
    )
}

export default Teachers;