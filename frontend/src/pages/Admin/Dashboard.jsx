import React, { useState, useEffect } from "react";
import { Users, GraduationCap, BookOpen, Calendar, TrendingUp } from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ students: 120, teachers: 45, classes: 32 });
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Mock data
  useEffect(() => {
    setEvents([
      { id: 1, title: "Khai gi?ng nam h?c m?i", date: "2026-09-05" },
      { id: 2, title: "H?i thao tru?ng", date: "2026-10-15" },
      { id: 3, title: "Ngày Nhà giáo Vi?t Nam", date: "2026-11-20" },
    ]);
    
    setAnnouncements([
      { id: 1, title: "Thông báo ngh? T?t", content: "L?ch ngh? T?t Nguyên Ðán 2026", date: "2026-01-25" },
      { id: 2, title: "K? ho?ch nam h?c m?i", content: "K? ho?ch tuy?n sinh nam 2026-2027", date: "2026-02-01" },
    ]);
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="page-header">
        <h1 className="page-title">
          <TrendingUp size={28} />
          Admin Dashboard
        </h1>
        <p className="page-subtitle">
          T?ng quan h? th?ng qu?n lý tru?ng h?c
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card students">
          <div className="stat-icon">
            <GraduationCap size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{counts.students}</span>
            <span className="stat-label">T?ng s? h?c sinh</span>
          </div>
        </div>
        
        <div className="stat-card teachers">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{counts.teachers}</span>
            <span className="stat-label">T?ng s? giáo viên</span>
          </div>
        </div>
        
        <div className="stat-card classes">
          <div className="stat-icon">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{counts.classes}</span>
            <span className="stat-label">T?ng s? l?p h?c</span>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="section">
        <h2 className="section-title">
          <Calendar size={20} />
          S? ki?n s?p t?i
        </h2>
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-date">{event.date}</div>
              <div className="event-title">{event.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="section">
        <h2 className="section-title">Thông báo g?n dây</h2>
        <div className="announcements-list">
          {announcements.map(announcement => (
            <div key={announcement.id} className="announcement-card">
              <h3 className="announcement-title">{announcement.title}</h3>
              <p className="announcement-content">{announcement.content}</p>
              <span className="announcement-date">{announcement.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
