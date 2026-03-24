import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    EventCalendarContainer,
    Content,
    CalendarContainer,
    Events,
    Event,
    AddEventForm,
    EventInput,
    AddEventButton,
    ErrorText
} from "../../styles/EventCalendarStyles";

const EventCalendar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [events, setEvents] = useState({});
    const [newEvent, setNewEvent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/v1/events/getall');
            setEvents(response.data.events || []);
        }catch (error){
            console.error('Error fetching events: ', error);
        }
    };

    const addEvent = async (e) => {
        e.preventDefault();
            try{
                const response = await axios.post('http://localhost:8080/api/v1/events', {
                    event: newEvent,
                });
                setEvents([...events, response.data.event]);
                setNewEvent('');
            }catch (error){
                console.error("Error adding event: ", error);
                if(error.response && error.response.data && error.response.data.error){
                    setError(error.response.data.error);
                }else{
                    setError('Error adding event:')
                }
            }
    };

    return(
        <EventCalendarContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <h1>Event and Calendar</h1>               
                <div>Current Time: </div>
                <CalendarContainer>
                    Calendar
                </CalendarContainer>
                <AddEventForm onSubmit={addEvent}>
                    <h2>Add New Event</h2>
                    <EventInput 
                        type="text"
                        value={newEvent}
                        onChange={(e) = setNewEvent(e.target.value)}
                        placeholder="Enter event"
                    />
                    <AddEventButton type="submit">Add Event</AddEventButton>
                </AddEventForm>

                <Events>
                    <h2>Event</h2>
                    {events.map((event, index) => (
                        <Event key={index}>{event}</Event>
                    ))}
                </Events>
                
            </Content>
        </EventCalendarContainer>
    )
}

export default EventCalendar