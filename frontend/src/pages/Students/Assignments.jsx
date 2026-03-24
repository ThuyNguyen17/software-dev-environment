import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    AssignmentsContainer,
    SidebarContainer,
    Content,
    AssignmentButton,
    AssignmentCard,
    AssignmentTitle,
    AssignmentDescription,
    AssignmentDoneMessage,
    AddAssignmentForm
} from "../../styles/AssignmentsStyles";

const StudentAssignments = () =>{
    const [isOpen, setIsOpen] = useState(true);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchAssigments();
    }, []);

    const fetchAssigments = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/assignments/getall');
            setAssignments(response.data.assignments);
        }catch (error){
            console.error('Error fetching assignments: ', error);
        }
    };

    return(
        <AssignmentsContainer>
            <SidebarContainer>
                <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </SidebarContainer>
            <Content isOpen={isOpen}>
                <h1>Assignments</h1>
                {assignments.map((assignment) => (
                    <AssignmentCard key={assignment.id}>
                        <AssignmentTitle>{assignment.title}</AssignmentTitle>
                        <AssignmentDescription>{assignment.descripton}</AssignmentDescription>
                        (!assignment.done ? (
                            <AddAssignmentForm onDoAssignment = {() => handleDoAssignment(assignment.id)}/>
                        ) : (
                            <AssignmentDoneMessage>Assignment is Done</AssignmentDoneMessage>
                        ))
                    </AssignmentCard>
                ))}
            </Content>
        </AssignmentsContainer>
    )
};

const AssignmentFrom = ({onDoAssignment}) => {
    const [opinion, setOpinion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(opinion.trim !== ''){
            onDoAssignment();
        }else{
            alert('Please provide your opinion/Assignment')
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <textarea value={opinion} onChange={handleInputChange} placeholder="Enter your opinion/assignment ..."/>
            <AssignmentButton type="submit">Submit</AssignmentButton>
        </form>
    );
};

export default StudentAssignments;