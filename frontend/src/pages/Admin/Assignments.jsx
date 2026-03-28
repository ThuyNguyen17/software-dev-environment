import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    AssignmentsContainer,
    Content,
    AssignmentsContent,
    AssignmentsHeader,
    AssignmentList,
    AssignmentItem,
    AddAssignmentForm,
    AddAssignmentInput,
    AddAssignmentTextArea,
    AddAssignmentButton
} from "../../styles/AssignmentsStyles";

const Assignments = () =>{
    const [isOpen, setIsOpen] = useState(true);
    const [newAssignment, setNewAssignment] = useState({title: '', description: '', grade: '', deadline: ''});
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
    const handleAddAssignment = async (e) => {
        e.preventDefault();
        const { title, description, grade, deadline } = newAssignment;
        if(title.trim() !== '' && description.trim() !== '' && grade.trim() !== '' && deadline.trim() !== ''){
            try{
                await axios.post('http://localhost:8080/api/v1/assignments', {
                    ...newAssignment,
                    deadline: new Date(deadline).toISOString().split('T')[0] // Format for backend LocalDate
                });
                fetchAssignments();
=======
    const handleAddAssigment = async (e) => {
        e.preventDefault();
        if(newAssignment.title.trim() !== '' && newAssignment.description.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== ''){
            try{
                const response = await axios.post('http://localhost:8080/api/v1/assignments', newAssignment);
                setTeachers([...assignments, response.data.assignment]);
>>>>>>> fix-final
                setNewAssignment({ title: '', description: '', grade: '', deadline: ''});
            }catch (error){
                console.error("Error adding assignment: ", error);
            }
        }
    };

<<<<<<< HEAD
    const handleDeleteAssignment = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/assignments/${id}`);
            fetchAssignments();
        } catch (error) {
            console.error("Error deleting assignment: ", error);
        }
    };

=======
>>>>>>> fix-final
    return(
        <AssignmentsContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <AssignmentsContent>
                    <AssignmentsHeader>Assignments</AssignmentsHeader>
<<<<<<< HEAD
                    <AddAssignmentForm onSubmit={handleAddAssignment}>
=======
                    <AddAssignmentForm onSubmit={handleAddAssigment}>
>>>>>>> fix-final
                        <AddAssignmentInput
                            type="text"
                            placeholder="Enter Assignment Title"
                            value={newAssignment.title}
<<<<<<< HEAD
                            onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                            required
=======
                            onChange={(e) => setAssignments({...newAssignment, title: e.target.value})}
>>>>>>> fix-final
                        />
                        <AddAssignmentTextArea
                            placeholder="Enter Assignment Description"
                            value={newAssignment.description}
<<<<<<< HEAD
                            onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                            required
                        />
                        <AddAssignmentInput
                            type="text"
                            placeholder="Enter Grade (e.g. 10)"
                            value={newAssignment.grade}
                            onChange={(e) => setNewAssignment({...newAssignment, grade: e.target.value})}
                            required
                        />
                        <AddAssignmentInput
                            type="date"
                            placeholder="Enter Assignment Deadline"
                            value={newAssignment.deadline}
                            onChange={(e) => setNewAssignment({...newAssignment, deadline: e.target.value})}
                            required
=======
                            onChange={(e) => setAssignments({...newAssignment, description: e.target.value})}
                        />
                        <AddAssignmentInput
                            type="text"
                            placeholder="Enter Assignment Grade"
                            value={newAssignment.grade}
                            onChange={(e) => setAssignments({...newAssignment, grade: e.target.value})}
                        />
                        <AddAssignmentInput
                            type="text"
                            placeholder="Enter Assignment Deadline"
                            value={newAssignment.deadline}
                            onChange={(e) => setAssignments({...newAssignment, deadline: e.target.value})}
>>>>>>> fix-final
                        />
                        <AddAssignmentButton type="submit">Add Assignment</AddAssignmentButton>
                    </AddAssignmentForm>

                    <AssignmentList>
<<<<<<< HEAD
                        {Array.isArray(assignments) && assignments.map((assignment) => (
                            <AssignmentItem key={assignment.id}>
                                <strong>{assignment.title}: </strong>
                                {assignment.description}, {assignment.grade}, {assignment.deadline}
                                <button onClick={() => handleDeleteAssignment(assignment.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
=======
                        {assignments.map((assignment) => (
                            <AssignmentItem key={assignment.id}>
                                <strong>{assignment.title}: </strong>
                                {assignment.description}, {assignment.grade}, {assignment.deadline}
>>>>>>> fix-final
                            </AssignmentItem>
                        ))}
                    </AssignmentList>
                </AssignmentsContent>
            </Content>
        </AssignmentsContainer>
    )
}

export default Assignments