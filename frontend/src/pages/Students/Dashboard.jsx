import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    StudentDashboardContainer,
    Content,
    Section,
    SectionTitle,
    CardContainer,
    Card,
    CardTitle,
    CardContent
} from "../../styles/DashboardStyles";

const StudentDashboard = () =>{
    const [isOpen, setIsOpen] = useState(true);
<<<<<<< HEAD
    const [counts, setCounts] = useState({
        assignments: 0,
        library: 0,
        attendance: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const assignmentRes = await axios.get('http://localhost:8080/api/v1/assignments/getall');
            const libraryRes = await axios.get('http://localhost:8080/api/v1/library/getall');
            
            const storedUser = localStorage.getItem('user');
            let attendanceCount = 0;
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const studentId = user.studentId || user.userId;
                const attendanceRes = await axios.get(`http://localhost:8080/api/attendance/student/${studentId}`);
                attendanceCount = attendanceRes.data.length;
            }

            setCounts({
                assignments: (assignmentRes.data.assignments || []).length,
                library: (libraryRes.data.books || []).length,
                attendance: attendanceCount
            });
        } catch (error) {
            console.error('Error fetching dashboard counts:', error);
        }
    }
=======
>>>>>>> fix-final
    
    return(
        <StudentDashboardContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                    <Section>
                        <SectionTitle>Overview</SectionTitle>
                        <CardContainer>
                            <Card>
<<<<<<< HEAD
                                <CardTitle>Assignments</CardTitle>
                                <CardContent>{counts.assignments}</CardContent>
                            </Card>
                            <Card>
                                <CardTitle>Total Books</CardTitle>
                                <CardContent>{counts.library}</CardContent>
                            </Card>
                            <Card>
                                <CardTitle>Check-ins</CardTitle>
                                <CardContent>{counts.attendance}</CardContent>
=======
                                <CardTitle>Assignment</CardTitle>
                                <CardContent>5</CardContent>
                            </Card>
                            <Card>
                                <CardTitle>Performance</CardTitle>
                                <CardContent>550</CardContent>
                            </Card>
                            <Card>
                                <CardTitle>Term</CardTitle>
                                <CardContent>1</CardContent>
>>>>>>> fix-final
                            </Card>
                        </CardContainer>
                    </Section>

                    <Section>
                        <SectionTitle>Recent Activity</SectionTitle>
<<<<<<< HEAD
                        <p>No recent activity</p>
=======
>>>>>>> fix-final
                    </Section>

                    <Section>
                        <SectionTitle>Upcoming Events</SectionTitle>
<<<<<<< HEAD
                        <p>Weekly School Meeting - Friday</p>
=======
>>>>>>> fix-final
                    </Section>
            </Content>
        </StudentDashboardContainer>
    )
}

export default StudentDashboard