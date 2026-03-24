import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    AnnouncementContainer,
    Content,
    Title,
    AnnouncementForm,
    FormGroup,
    Label,
    TextArea,
    Button,
    AnnouncementList,
    AnnouncementItem,
    AnnouncementContent
} from "../../styles/AnnouncementStyles";

const Announcement = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [announcement, setAnnouncement] = useState({});
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/announcements/getall');
            setAnnouncements(response.data.announcements);
        } catch (error) {
            console.error('Error fetching announcements: ', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/announcements', {
                announcement: announcement,

            });
            console.log("Announcement Sent", response.data)
            setAnnouncement('');
            fetchAnnouncements();
        } catch (error) {
            console.error("Error adding Announcement: ", error);
        }
    };

    return (
        <AnnouncementContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <Title>Announcement</Title>
                <AnnouncementForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="announcement">Announcement</Label>
                        <TextArea
                            id='announcement'
                            value={announcement}
                            onChange={(e) =>setAnnouncement(e.target.value)}
                            required
                            rows={4}
                            cols={50}
                        />
                    </FormGroup>
                    <Button type="subit">Send Announcement</Button>
                </AnnouncementForm>

                <h2>Announcement</h2>
                <AnnouncementList>
                    {announcements.map((announcement) => {
                        <AnnouncementItem key={announcement}>
                            <AnnouncementContent>{announcement.announcement}</AnnouncementContent>
                        </AnnouncementItem>
                    })}
                </AnnouncementList>
            </Content>
        </AnnouncementContainer>
    )
}

export default Announcement