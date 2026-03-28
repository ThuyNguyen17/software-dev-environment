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
<<<<<<< HEAD
    const [announcementText, setAnnouncementText] = useState('');
=======
    const [announcement, setAnnouncement] = useState({});
>>>>>>> fix-final
    const [announcements, setAnnouncements] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
<<<<<<< HEAD
            await axios.post('http://localhost:8080/api/v1/announcements', {
                announcement: announcementText
            });
            setAnnouncementText('');
=======
            const response = await axios.post('http://localhost:8080/api/v1/announcements', {
                announcement: announcement,

            });
            console.log("Announcement Sent", response.data)
            setAnnouncement('');
>>>>>>> fix-final
            fetchAnnouncements();
        } catch (error) {
            console.error("Error adding Announcement: ", error);
        }
    };

<<<<<<< HEAD
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/announcements/${id}`);
            fetchAnnouncements();
        } catch (error) {
            console.error("Error deleting Announcement: ", error);
        }
    };

=======
>>>>>>> fix-final
    return (
        <AnnouncementContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <Title>Announcement</Title>
                <AnnouncementForm onSubmit={handleSubmit}>
                    <FormGroup>
<<<<<<< HEAD
                        <Label htmlFor="announcement">Announcement Message</Label>
                        <TextArea
                            id='announcement'
                            value={announcementText}
                            onChange={(e) => setAnnouncementText(e.target.value)}
                            required
                            rows={4}
                        />
                    </FormGroup>
                    <Button type="submit">Send Announcement</Button>
                </AnnouncementForm>

                <h2>Announcement List</h2>
                <AnnouncementList>
                    {Array.isArray(announcements) && announcements.map((ann) => (
                        <AnnouncementItem key={ann.id}>
                            <AnnouncementContent>{ann.announcement}</AnnouncementContent>
                            <button onClick={() => handleDelete(ann.id)} style={{ marginTop: '5px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px 10px' }}>Delete</button>
                        </AnnouncementItem>
                    ))}
=======
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
>>>>>>> fix-final
                </AnnouncementList>
            </Content>
        </AnnouncementContainer>
    )
}

export default Announcement