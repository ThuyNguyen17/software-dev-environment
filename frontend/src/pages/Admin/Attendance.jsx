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

<<<<<<< HEAD
const Attendance = () => {
    const [isOpen, setIsOpen] = useState(true);
=======
const Attendance = () => {    const [isOpen, setIsOpen] = useState(true);    const [students, setStudents] = useState({});
>>>>>>> fix-final
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
<<<<<<< HEAD
            const response = await axios.get('http://localhost:8080/api/students');
            const students = response.data || [];
            initializeAttendanceData(students);
=======
            const response = await axios.get('http://localhost:8080/api/v1/students/getall');
            setStudents(response.data.students);
            initializeAttendanceData(response.data.students);
>>>>>>> fix-final
        } catch (error) {
            console.error('Error fetching students: ', error);
        }
    };

    const initializeAttendanceData = (students) => {
        const initialAttendanceData = students.map((student) => ({
            id: student.id,
<<<<<<< HEAD
            name: student.fullName,
=======
            name: student.name,
>>>>>>> fix-final
            status: 'Present'
        }));
        setAttendanceData(initialAttendanceData)
    };

    const handleStatusChange = (id, status) => {
<<<<<<< HEAD
        const updatedData = attendanceData.map((record) => {
            if (record.id === id) {
                return { ...record, status }
            }
            return record
        });
        setAttendanceData(updatedData)
=======
        const updateData = attendanceData.map((student) => {
            if (students.id == id) {
                return { ...student, status }
            }
            return student
        });
        setAttendanceData(initializeAttendanceData)
>>>>>>> fix-final
    };

    const handleSubmit = async () => {
        try {
<<<<<<< HEAD
            // Note: Currently pointing to a dummy endpoint as backend requires a session-based recording
            const response = await axios.post('http://localhost:8080/api/attendance/bulk', { attendanceData });
            alert("Attendance Submitted!");
        } catch (error) {
            console.error('Error submitting attendance data: ', error)
            alert("Submission failed (API endpoint may be missing)");
=======
            const formattedData = attendanceData.map(({ id, name, status }) => ({ studentId: id, name, status }));
            const response = await axios.post('http://localhost:4000/api/v1/attendance', { attendanceData: formattedData });
        } catch (error) {
            console.error('Error submitting attendance data: ', error)
>>>>>>> fix-final
        }
    };

    return (
        <AttendanceContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <AttendanceContent>
<<<<<<< HEAD
                    <AttendanceHeader>Attendance Management</AttendanceHeader>
                    <AttendanceList>
                        {attendanceData.map((student, index) => (
                            <React.Fragment key={student.id}>
                                <AttendanceItem>
                                    <StudentName>{student.name}</StudentName>
                                    <CheckboxLabel>
                                        <input
                                            type="checkbox"
                                            checked={ student.status === "Present"}
=======
                    <AttendanceHeader>Attendance</AttendanceHeader>
                    <AttendanceList>
                        {StudentName.map((student, index) => (
                            <React.Fragment key={student.id}>
                                <AttendanceItem>
                                    <StudentName></StudentName>
                                    <CheckboxLabel>
                                        <input
                                            type="checkbox"
                                            checked={ attendanceData[index]?.status === "Present"}
>>>>>>> fix-final
                                            onChange={ () => handleStatusChange(student.id, "Present") }
                                        />
                                        Present
                                    </CheckboxLabel>
                                    <CheckboxLabel>
                                        <input
                                            type="checkbox"
<<<<<<< HEAD
                                            checked={ student.status === "Absent"}
=======
                                            checked={ attendanceData[index]?.status === "Absent"}
>>>>>>> fix-final
                                            onChange={ () => handleStatusChange(student.id, "Absent") }
                                        />
                                        Absent
                                    </CheckboxLabel>
                                    <CheckboxLabel>
                                        <input
                                            type="checkbox"
<<<<<<< HEAD
                                            checked={ student.status === "Absent with Apology"}
                                            onChange={ () => handleStatusChange(student.id, "Absent with Apology") }
=======
                                            checked={ attendanceData[index]?.status === "Adsent with Apologgy"}
                                            onChange={ () => handleStatusChange(student.id, "Absent with Apololy") }
>>>>>>> fix-final
                                        />
                                        Absent with apology
                                    </CheckboxLabel>
                                </AttendanceItem>
<<<<<<< HEAD
                                { index !== attendanceData.length - 1 && <Divider /> }
                            </React.Fragment>
                        ))}
                    </AttendanceList>
                    <SubmitButton onClick={ handleSubmit }>Submit Changes</SubmitButton>
=======
                                { index !== students.length - 1 && <Divider /> }
                            </React.Fragment>
                        ))}
                    </AttendanceList>
                    <SubmitButton onClick={ handleSubmit }>Submit</SubmitButton>
>>>>>>> fix-final
                </AttendanceContent>
            </Content>
        </AttendanceContainer>
    )
};

export default Attendance;