import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import EventCalendar from "./EventCalendar";
import Announcement from "./Announcement";
import Performance from "./Performance";
import axios from "axios";
import {
    AdminDashboardContainer,
    Content,
    TopContent,
    BottomContent,
    Section,
    SectionTitle,
    CardContainer,
    Card,
    CardContent,
    CardTitle    
} from "../../styles/DashboardStyles";

const AdminDashboard = () =>{

    const [isOpen, setIsOpen] = useState(true);
    const [events, setEvents] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [studentPerformance, setStudentPerformance] = useState([]);
    const [counts, setCounts] = useState({ students: 0, teachers: 0, classes: 0 });

    useEffect(() => {
        fetchEvents();
        fetchAnnouncements();
        fetchStudentPerformance();
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const studentRes = await axios.get('http://localhost:8080/api/students');
            const teacherRes = await axios.get('http://localhost:8080/api/v1/teachers/getall');
            setCounts({
                students: studentRes.data.length || 0,
                teachers: teacherRes.data.teachers?.length || 0,
                classes: 15 // Placeholder
            });
        } catch (error) {
            console.error('Error fetching counts: ', error);
        }
    }

    const fetchEvents = async () => {
        try{
            // Using the new event controller endpoint
            const response = await axios.get('http://localhost:8080/api/v1/events/getall');
            setEvents(response.data.events || []);
        }catch (error){
            console.error('Error fetching events: ', error);
        }
    };

    const fetchAnnouncements = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/announcements/getall');
            setAnnouncements(response.data.announcements || []);
        }catch (error){
            console.error('Error fetching announcements: ', error);
        }
    };

    const fetchStudentPerformance = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/performance/getall');
            setStudentPerformance(response.data.performance || []);
        }catch (error){
            console.error('Error fetching performance: ', error);
        }
    };

    return(
        <AdminDashboardContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <TopContent>
                    <Section>
                        <SectionTitle>Overview</SectionTitle>
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
                        <SectionTitle>All Events</SectionTitle>
                        <EventCalendar events={events} />
                    </Section>
                </TopContent>

                <BottomContent>
                    <Performance studentPerformance ={studentPerformance}/>
                    <Announcement announcements = {announcements}/>
                </BottomContent>
            </Content>
        </AdminDashboardContainer>
    )
};

export default AdminDashboard;