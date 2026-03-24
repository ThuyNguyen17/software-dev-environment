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
    
    return(
        <StudentDashboardContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                    <Section>
                        <SectionTitle>Overview</SectionTitle>
                        <CardContainer>
                            <Card>
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
                            </Card>
                        </CardContainer>
                    </Section>

                    <Section>
                        <SectionTitle>Recent Activity</SectionTitle>
                    </Section>

                    <Section>
                        <SectionTitle>Upcoming Events</SectionTitle>
                    </Section>
            </Content>
        </StudentDashboardContainer>
    )
}

export default StudentDashboard