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
<<<<<<< HEAD
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/assignments/getall');
            setAssignments(response.data.assignments || []);
=======
        fetchAssigments();
    }, []);

    const fetchAssigments = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/assignments/getall');
            setAssignments(response.data.assignments);
>>>>>>> fix-final
        }catch (error){
            console.error('Error fetching assignments: ', error);
        }
    };

<<<<<<< HEAD
    const handleDoAssignment = async (id) => {
        // Logic to submission or mark as done locally for now
        alert('Đã nộp bài tập! (Chức năng này đang được phát triển thêm ở backend)');
    };

=======
>>>>>>> fix-final
    return(
        <AssignmentsContainer>
            <SidebarContainer>
                <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </SidebarContainer>
            <Content isOpen={isOpen}>
                <h1>Assignments</h1>
<<<<<<< HEAD
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {assignments.map((assignment) => (
                        <AssignmentCard key={assignment.id}>
                            <AssignmentTitle>{assignment.title}</AssignmentTitle>
                            <AssignmentDescription>{assignment.description}</AssignmentDescription>
                            <p>Hạn nộp: {assignment.deadline}</p>
                            <p>Lớp: {assignment.grade}</p>
                            {assignment.done ? (
                                <AssignmentDoneMessage>Assignment is Done</AssignmentDoneMessage>
                            ) : (
                                <AssignmentForm onDoAssignment={() => handleDoAssignment(assignment.id)}/>
                            )}
                        </AssignmentCard>
                    ))}
                </div>
=======
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
>>>>>>> fix-final
            </Content>
        </AssignmentsContainer>
    )
};

<<<<<<< HEAD
const AssignmentForm = ({onDoAssignment}) => {
=======
const AssignmentFrom = ({onDoAssignment}) => {
>>>>>>> fix-final
    const [opinion, setOpinion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
<<<<<<< HEAD
        if(opinion.trim() !== ''){
            onDoAssignment();
            setOpinion('');
        }else{
            alert('Please provide your assignment content')
=======
        if(opinion.trim !== ''){
            onDoAssignment();
        }else{
            alert('Please provide your opinion/Assignment')
>>>>>>> fix-final
        }
    };

    return(
<<<<<<< HEAD
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <textarea 
                value={opinion} 
                onChange={(e) => setOpinion(e.target.value)} 
                placeholder="Nhập nội dung bài làm của bạn..."
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
            />
            <AssignmentButton type="submit" style={{ marginTop: '10px' }}>Submit Assignment</AssignmentButton>
=======
        <form onSubmit={handleSubmit}>
            <textarea value={opinion} onChange={handleInputChange} placeholder="Enter your opinion/assignment ..."/>
            <AssignmentButton type="submit">Submit</AssignmentButton>
>>>>>>> fix-final
        </form>
    );
};

export default StudentAssignments;