import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    AttendanceContainer,
    SidebarContainer,
    Content,
    AttendanceHeader,
    AttendanceList,
    AttendanceItem,
    AttendanceDate,
    AttendanceStatus
} from "../../styles/AttendanceStyles";

const AttendanceSection = () =>{

    const [isOpen, setIsOpen] = useState(true);

    const attendance = [
        { id: 1, date: '2026-01-01', present: true },
        { id: 2, date: '2026-01-02', present: false },
        { id: 3, date: '2026-01-03', present: true },
        { id: 4, date: '2026-01-04', present: true },
        { id: 5, date: '2026-01-05', present: false }
    ];

    return(
        <AttendanceContainer>
            <SidebarContainer>
                <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </SidebarContainer>
            <Content isOpen={isOpen}>
                <AttendanceHeader>Attendance</AttendanceHeader>
                <AttendanceList>
                    {attendance.map(({ id, date, present }) => (
                        <AttendanceItem key={id}>
                            <AttendanceDate>{date}</AttendanceDate>
                            <AttendanceStatus present={present}>{present ? 'Present' : 'Absent'}</AttendanceStatus>
                        </AttendanceItem>
                    ))};
                </AttendanceList>
            </Content>
        </AttendanceContainer>
    )
}

export default AttendanceSection