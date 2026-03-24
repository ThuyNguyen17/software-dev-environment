import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    AttendanceContainer,
    Content,
    AttendanceContent,
    AttendanceHeader,
    AttendanceList,
    AttendanceItem,
    StudentName,
    CheckboxLabel,
    Divider,
    SubmitButton
} from "../../styles/AttendanceStyles";

const CheckAttendanceSection = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/students');
            const students = response.data || [];
            const initialAttendanceData = students.map((student) => ({
                id: student.id,
                fullName: student.fullName,
                status: 'Present'
            }));
            setAttendanceData(initialAttendanceData);
        } catch (error) {
            console.error('Error fetching students for attendance: ', error);
        }
    };

    const handleStatusChange = (id, status) => {
        setAttendanceData(prevData => prevData.map((item) => {
            if (item.id === id) {
                return { ...item, status }
            }
            return item;
        }));
    };

    const handleSubmit = async () => {
        try {
            const attendancePayload = attendanceData.map(({ id, status }) => ({ 
                studentId: id, 
                status 
            }));
            await axios.post('http://localhost:8080/api/v1/attendance', { attendance: attendancePayload });
            alert('Attendance submitted successfully!');
        } catch (error) {
            console.error('Error submitting attendance data: ', error);
            alert('Failed to submit attendance.');
        }
    };

    return (
        <AttendanceContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <AttendanceContent>
                    <AttendanceHeader>Attendance</AttendanceHeader>
                    <AttendanceList>
                        {attendanceData.map((student, index) => (
                            <React.Fragment key={student.id}>
                                <AttendanceItem>
                                    <StudentName>{student.fullName}</StudentName>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <CheckboxLabel>
                                            <input
                                                type="radio"
                                                name={`attendance-${student.id}`}
                                                checked={ student.status === "Present"}
                                                onChange={ () => handleStatusChange(student.id, "Present") }
                                            />
                                            Present
                                        </CheckboxLabel>
                                        <CheckboxLabel>
                                            <input
                                                type="radio"
                                                name={`attendance-${student.id}`}
                                                checked={ student.status === "Absent"}
                                                onChange={ () => handleStatusChange(student.id, "Absent") }
                                            />
                                            Absent
                                        </CheckboxLabel>
                                        <CheckboxLabel>
                                            <input
                                                type="radio"
                                                 name={`attendance-${student.id}`}
                                                checked={ student.status === "Excused"}
                                                onChange={ () => handleStatusChange(student.id, "Excused") }
                                            />
                                            Excused
                                        </CheckboxLabel>
                                    </div>
                                </AttendanceItem>
                                { index !== attendanceData.length - 1 && <Divider /> }
                            </React.Fragment>
                        ))}
                    </AttendanceList>
                    <SubmitButton onClick={ handleSubmit }>Submit Attendance</SubmitButton>
                </AttendanceContent>
            </Content>
        </AttendanceContainer>
    )
}

export default CheckAttendanceSection