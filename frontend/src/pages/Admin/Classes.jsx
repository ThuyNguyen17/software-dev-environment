import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
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
} from "../../styles/ClassesStyles";

const Classes = () =>{
    const [isOpen, setIsOpen] = useState(true);
<<<<<<< HEAD
    const [gradeLevel, setGradeLevel] = useState('');
    const [className, setClassName] = useState('');
    const [classes, setClasses] = useState([]);

=======
    const [newClassName, setNewClassName] = useState('');
    const [classes, setClasses] = useState([]);
>>>>>>> fix-final
    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/class/getall');
<<<<<<< HEAD
            if(response.data && response.data.success){
                setClasses(response.data.classes || []);
=======
            if(response.data && isArray(response.data.classes)){
                setClasses(response.data.classes);
>>>>>>> fix-final
            }else{
                console.log("Error while fetching classes: Invalid data format", response.data)
            }
        }catch (error){
<<<<<<< HEAD
            console.error('Error fetching classes: ', error);
=======
            console.error('Error fetching events: ', error);
>>>>>>> fix-final
        }
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if(gradeLevel !== '' && className !== ''){
            try{
                const response = await axios.post('http://localhost:8080/api/v1/class', {
                    gradeLevel: parseInt(gradeLevel),
                    className: className
                });
                if (response.data.success) {
                    fetchClasses(); // Refresh list
                    setGradeLevel('');
                    setClassName('');
                }
=======
        if(newClassName.trim() !== ''){
            try{
                const response = await axios.post('http://localhost:8080/api/v1/class', {grade: newClassName});
                console.log('Response data: ', response.data)
                setClasses(prevClasses => {
                    if(Array.isArray(prevClasses)){
                        return [...prevClasses, response.data];
                    }else{
                        console.log("Error adding class: Invalid state for class", prevClasses);
                        return[];
                    }
                })
                setNewClassName('');
>>>>>>> fix-final
            }catch (error){
                console.error("Error adding class: ", error);
            }
        }
    };

<<<<<<< HEAD
    const handleDeleteClass = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/class/${id}`);
            fetchClasses();
        } catch (error) {
            console.error("Error deleting class: ", error);
        }
    };

=======
>>>>>>> fix-final
    return(
        <ClassesContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <ClassesContent>
                    <ClassHeader>Classes</ClassHeader>
                    <AddClassForm onSubmit={handleAddClass}>
                        <AddClassInput 
<<<<<<< HEAD
                            type="number"
                            placeholder="Grade Level (e.g. 10)"
                            value={gradeLevel}
                            onChange={(e) => setGradeLevel(e.target.value)}
                            required
                        />
                        <AddClassInput 
                            type="text"
                            placeholder="Class Name (e.g. A1)"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
=======
                            type="text"
                            placeholder="Enter Class Name"
                            value={newClassName}
                            onChange={(e) => setNewClassName(e.target.value)}
>>>>>>> fix-final
                        />
                        <AddClassButton type="submit">Add Class</AddClassButton>
                    </AddClassForm>
                    <ClassList>
<<<<<<< HEAD
                        {Array.isArray(classes) && classes.map((cls, index) => (
                            <ClassItem key={cls.id || index}>
                                {cls.gradeLevel}{cls.className}
                                <button onClick={() => handleDeleteClass(cls.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                            </ClassItem>
                        ))}
=======
                        {Array.isArray(classes && classes.map((ClassItem, index) => {
                            <ClassItem key={index}>{ClassItem.grade}</ClassItem>
                        }))}
>>>>>>> fix-final
                    </ClassList>
                </ClassesContent>
            </Content>
        </ClassesContainer>
    )
}

export default Classes