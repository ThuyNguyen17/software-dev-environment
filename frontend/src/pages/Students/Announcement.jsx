import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    AnnouncementContainer,
    SidebarContainer,
    Content,    
    AnnouncementHeader,
    AnnouncementList,
    AnnouncementItem,
    AnnouncementTitle,
    AnnouncementContent
} from "../../styles/AnnouncementStyles";

const AnnouncementSection = () =>{
<<<<<<< HEAD
    const [isOpen, setIsOpen] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
=======

    const [isOpen, setIsOpen] = useState(true);
    const [announcement, setAnnouncement] = useState([]);
>>>>>>> fix-final

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/announcements/getall');
<<<<<<< HEAD
            setAnnouncements(response.data.announcements || []);
=======
            setAnnouncements(response.data.announcements);
>>>>>>> fix-final
        } catch (error) {
            console.error('Error fetching announcements: ', error);
        }
    };

<<<<<<< HEAD
=======

>>>>>>> fix-final
    return(
        <AnnouncementContainer>
            <SidebarContainer>
                <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </SidebarContainer>
            <Content isOpen={isOpen}>
                <AnnouncementHeader>Announcements</AnnouncementHeader>
                <AnnouncementList>
<<<<<<< HEAD
                    {announcements.map((item) => (
                        <AnnouncementItem key={item.id}>
                            <AnnouncementTitle>{item.announcement}</AnnouncementTitle>
                        </AnnouncementItem>
                    ))}
=======
                    {announcements.map((announcement) => {
                    <AnnouncementItem key={announcement._id}>
                    <AnnouncementTitle>{announcement.announcement}</AnnouncementTitle>
                    </AnnouncementItem>
                    })}
>>>>>>> fix-final
                </AnnouncementList>
            </Content>
        </AnnouncementContainer>
    )
}

export default AnnouncementSection