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
    const [newClassName, setNewClassName] = useState('');
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/class/getall');
            if(response.data && isArray(response.data.classes)){
                setClasses(response.data.classes);
            }else{
                console.log("Error while fetching classes: Invalid data format", response.data)
            }
        }catch (error){
            console.error('Error fetching events: ', error);
        }
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
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
            }catch (error){
                console.error("Error adding class: ", error);
            }
        }
    };

    return(
        <ClassesContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <ClassesContent>
                    <ClassHeader>Classes</ClassHeader>
                    <AddClassForm onSubmit={handleAddClass}>
                        <AddClassInput 
                            type="text"
                            placeholder="Enter Class Name"
                            value={newClassName}
                            onChange={(e) => setNewClassName(e.target.value)}
                        />
                        <AddClassButton type="submit">Add Class</AddClassButton>
                    </AddClassForm>
                    <ClassList>
                        {Array.isArray(classes && classes.map((ClassItem, index) => {
                            <ClassItem key={index}>{ClassItem.grade}</ClassItem>
                        }))}
                    </ClassList>
                </ClassesContent>
            </Content>
        </ClassesContainer>
    )
}

export default Classes