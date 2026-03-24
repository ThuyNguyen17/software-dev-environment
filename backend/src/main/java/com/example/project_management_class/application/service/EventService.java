package com.example.project_management_class.application.service;

import com.example.project_management_class.domain.model.Event;
import java.util.List;

public interface EventService {
    void addEvent(Event event);
    List<Event> getAllEvents();
    void deleteEvent(String id);
    Event updateEvent(String id, Event event);
}
