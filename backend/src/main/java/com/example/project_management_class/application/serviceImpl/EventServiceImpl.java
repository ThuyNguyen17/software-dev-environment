package com.example.project_management_class.application.serviceImpl;

import com.example.project_management_class.application.service.EventService;
import com.example.project_management_class.domain.model.Event;
import com.example.project_management_class.domain.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    @Override
    public void addEvent(Event event) {
        eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    @Override
    public Event updateEvent(String id, Event event) {
        event.setId(id);
        return eventRepository.save(event);
    }
}
