import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    ExamContainer,
<<<<<<< HEAD
    Content,
    ExamContent,
    ExamHeader,
    AddExamForm,
    ExamInput,
    AddExamButton,
    ExamList,
    ExamItem
=======
    SidebarContainer,
    Content,
    ExamHeader,
    ExamForm,
    FormLabel,
    FormInput,
    AddButton
>>>>>>> fix-final
} from "../../styles/ExamStyles";

const AdminExamSection = () => {
    const [isOpen, setIsOpen] = useState(true);
<<<<<<< HEAD
    const [name, setName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [className, setClassName] = useState('');
=======
    const [examCategory, setExamCategory] = useState('');
    const [subject, setSubject] = useState('');
>>>>>>> fix-final
    const [marks, setMarks] = useState('');
    const [exams, setExams] = useState([]);
    const [editingExam, setEditingExam] = useState(null);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/exams/getall');
            setExams(response.data.exams || []);
        } catch (error) {
            console.error('Error fetching exams: ', error);
        }
    };

    const handleAddExam = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/v1/exams', {
<<<<<<< HEAD
                name,
                registrationNumber,
                className,
                marks: parseInt(marks)
            });
            setName('');
            setRegistrationNumber('');
            setClassName('');
=======
                examCategory,
                subject,
                marks: parseInt(marks)
            });
            setExamCategory('');
            setSubject('');
>>>>>>> fix-final
            setMarks('');
            fetchExams();
            alert('Exam Result Added!');
        } catch (error) {
            console.error('Error adding exam: ', error);
<<<<<<< HEAD
            alert('Failed to add exam. Maybe unique registration number already exists?');
=======
>>>>>>> fix-final
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this exam result?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/exams/${id}`);
                fetchExams();
            } catch (error) {
                console.error('Error deleting exam: ', error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/exams/${editingExam.id}`, {
                ...editingExam,
                marks: parseInt(editingExam.marks)
            });
            setEditingExam(null);
            fetchExams();
            alert('Exam Result Updated!');
        } catch (error) {
            console.error('Error updating exam: ', error);
        }
    };

    return (
        <ExamContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <ExamContent>
                    <ExamHeader>Admin: Exam Results Management</ExamHeader>
                    
                    {editingExam ? (
                        <AddExamForm onSubmit={handleUpdate}>
                            <h3>Edit Exam Result</h3>
                            <ExamInput
                                type="text"
<<<<<<< HEAD
                                value={editingExam.name}
                                onChange={(e) => setEditingExam({ ...editingExam, name: e.target.value })}
                                placeholder="Exam Name (e.g. Midterm)"
=======
                                value={editingExam.examCategory}
                                onChange={(e) => setEditingExam({ ...editingExam, examCategory: e.target.value })}
                                placeholder="Exam Category"
>>>>>>> fix-final
                                required
                            />
                            <ExamInput
                                type="text"
<<<<<<< HEAD
                                value={editingExam.registrationNumber}
                                onChange={(e) => setEditingExam({ ...editingExam, registrationNumber: e.target.value })}
                                placeholder="Registration Number"
                                required
                            />
                            <ExamInput
                                type="text"
                                value={editingExam.className}
                                onChange={(e) => setEditingExam({ ...editingExam, className: e.target.value })}
                                placeholder="Class Name"
=======
                                value={editingExam.subject}
                                onChange={(e) => setEditingExam({ ...editingExam, subject: e.target.value })}
                                placeholder="Subject"
>>>>>>> fix-final
                                required
                            />
                            <ExamInput
                                type="number"
                                value={editingExam.marks}
                                onChange={(e) => setEditingExam({ ...editingExam, marks: e.target.value })}
                                placeholder="Marks"
                                required
                            />
                            <AddExamButton type="submit">Update</AddExamButton>
                            <AddExamButton type="button" onClick={() => setEditingExam(null)} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Cancel</AddExamButton>
                        </AddExamForm>
                    ) : (
                        <AddExamForm onSubmit={handleAddExam}>
                            <h3>Add Exam Result</h3>
                            <ExamInput
                                type="text"
<<<<<<< HEAD
                                placeholder="Exam Name (e.g., Midterm)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
=======
                                placeholder="Exam Category (e.g., Midterm)"
                                value={examCategory}
                                onChange={(e) => setExamCategory(e.target.value)}
>>>>>>> fix-final
                                required
                            />
                            <ExamInput
                                type="text"
<<<<<<< HEAD
                                placeholder="Registration Number"
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                required
                            />
                            <ExamInput
                                type="text"
                                placeholder="Class Name"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
=======
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
>>>>>>> fix-final
                                required
                            />
                            <ExamInput
                                type="number"
                                placeholder="Marks"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                                required
                            />
                            <AddExamButton type="submit">Add Exam</AddExamButton>
                        </AddExamForm>
                    )}

                    <ExamList>
<<<<<<< HEAD
                        {Array.isArray(exams) && exams.length > 0 ? exams.map((exam) => (
                            <ExamItem key={exam.id}>
                                <div>
                                    <strong>{exam.name}</strong>: {exam.className} (Reg: {exam.registrationNumber}) - {exam.marks} Marks
=======
                        {exams.length > 0 ? exams.map((exam) => (
                            <ExamItem key={exam.id}>
                                <div>
                                    <strong>{exam.examCategory}</strong>: {exam.subject} - {exam.marks} Marks
>>>>>>> fix-final
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <button onClick={() => setEditingExam(exam)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDelete(exam.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </ExamItem>
                        )) : <p>No exam results found.</p>}
                    </ExamList>
                </ExamContent>
            </Content>
        </ExamContainer>
    );
};

export default AdminExamSection;