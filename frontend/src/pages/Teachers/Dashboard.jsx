import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    TeacherDashboardContainer,
    Content,
    Section,
    SectionTitle,
    CardContainer,
    Card,
    CardTitle,
    CardContent
} from "../../styles/DashboardStyles";

const TeacherDashboard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [counts, setCounts] = useState({ students: 0, teachers: 0, classes: 0 });

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const studentRes = await axios.get('http://localhost:8080/api/students');
            const teacherRes = await axios.get('http://localhost:8080/api/v1/teachers/getall');
            const classRes = await axios.get('http://localhost:8080/api/v1/school-classes');
            
            setCounts({
                students: studentRes.data?.length || 0,
                teachers: teacherRes.data?.teachers?.length || 0,
                classes: classRes.data?.classes?.length || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard counts: ', error);
        }
    }
    
    return(
        <TeacherDashboardContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                    <Section>
                        <SectionTitle>Teacher Overview</SectionTitle>
                        <CardContainer>
                            <Card>
                                <CardTitle>Total Students</CardTitle>
                                <CardContent>{counts.students}</CardContent>
                            </Card>
                            <Card>
                                <CardTitle>Total Teachers</CardTitle>
                                <CardContent>{counts.teachers}</CardContent>
                            </Card>
                            <Card>
                                <CardTitle>Total Classes</CardTitle>
                                <CardContent>{counts.classes}</CardContent>
                            </Card>
                        </CardContainer>
                    </Section>

                    <Section>
                        <SectionTitle>Recent Activity</SectionTitle>
                        <p>No recent activity at the moment.</p>
                    </Section>

                    <Section>
                        <SectionTitle>Upcoming Events</SectionTitle>
                        <p>Stay tuned for school events.</p>
                    </Section>
            </Content>
        </TeacherDashboardContainer>
    )
}

export default TeacherDashboard