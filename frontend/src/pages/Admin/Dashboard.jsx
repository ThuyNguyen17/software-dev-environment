import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
<<<<<<< HEAD
=======
import EventCalendar from "./EventCalendar";
import Announcement from "./Announcement";
import Performance from "./Performance";
>>>>>>> fix-final
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
<<<<<<< HEAD
    const [isOpen, setIsOpen] = useState(true);
    const [events, setEvents] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
=======

    const [isOpen, setIsOpen] = useState(true);
    const [events, setEvents] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [studentPerformance, setStudentPerformance] = useState([]);
>>>>>>> fix-final
    const [counts, setCounts] = useState({ students: 0, teachers: 0, classes: 0 });

    useEffect(() => {
        fetchEvents();
        fetchAnnouncements();
<<<<<<< HEAD
=======
        fetchStudentPerformance();
>>>>>>> fix-final
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const studentRes = await axios.get('http://localhost:8080/api/students');
            const teacherRes = await axios.get('http://localhost:8080/api/v1/teachers/getall');
<<<<<<< HEAD
            const classRes = await axios.get('http://localhost:8080/api/v1/class/getall');
            setCounts({
                students: Array.isArray(studentRes.data) ? studentRes.data.length : 0,
                teachers: teacherRes.data.teachers?.length || 0,
                classes: classRes.data.classes?.length || 0
=======
            setCounts({
                students: studentRes.data.length || 0,
                teachers: teacherRes.data.teachers?.length || 0,
                classes: 15 // Placeholder
>>>>>>> fix-final
            });
        } catch (error) {
            console.error('Error fetching counts: ', error);
        }
    }

    const fetchEvents = async () => {
        try{
<<<<<<< HEAD
=======
            // Using the new event controller endpoint
>>>>>>> fix-final
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

<<<<<<< HEAD
=======
    const fetchStudentPerformance = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/performance/getall');
            setStudentPerformance(response.data.performance || []);
        }catch (error){
            console.error('Error fetching performance: ', error);
        }
    };

>>>>>>> fix-final
    return(
        <AdminDashboardContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <TopContent>
                    <Section>
<<<<<<< HEAD
                        <SectionTitle>Overview Dashboard</SectionTitle>
=======
                        <SectionTitle>Overview</SectionTitle>
>>>>>>> fix-final
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
<<<<<<< HEAD
                        <SectionTitle>Upcoming Events</SectionTitle>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {events.slice(0, 5).map(e => <li key={e.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{e.events}</li>)}
                        </ul>
=======
                        <SectionTitle>All Events</SectionTitle>
                        <EventCalendar events={events} />
>>>>>>> fix-final
                    </Section>
                </TopContent>

                <BottomContent>
<<<<<<< HEAD
                    <Section style={{ flex: 1 }}>
                        <SectionTitle>Latest Announcements</SectionTitle>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {announcements.slice(0, 5).map(a => (
                                <li key={a.id} style={{ padding: '10px' }}>
                                    <strong>{a.announcement}</strong>
                                </li>
                            ))}
                        </ul>
                    </Section>
=======
                    <Performance studentPerformance ={studentPerformance}/>
                    <Announcement announcements = {announcements}/>
>>>>>>> fix-final
                </BottomContent>
            </Content>
        </AdminDashboardContainer>
    )
};

export default AdminDashboard;