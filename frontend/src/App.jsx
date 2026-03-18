import { Routes, Route, Navigate } from "react-router-dom";
import TeacherTimetable from "./pages/TeacherTimetable";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import StudentScanner from "./pages/StudentScanner";
import AttendanceHistory from "./pages/AttendanceHistory";
import SubjectAttendance from "./pages/SubjectAttendance";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TeacherTimetable />} />
      <Route path="/teacher/timetable" element={<TeacherTimetable />} />

      {/* Student Routes */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/scan" element={<StudentScanner />} />
      <Route path="/student/history" element={<AttendanceHistory />} />
      <Route path="/student/subject/:assignmentId" element={<SubjectAttendance />} />

      <Route path="/attendance" element={<Navigate to="/student/scan" replace />} />
      <Route path="*" element={<div><h1>Path not found: {window.location.pathname}</h1></div>} />
    </Routes>
  );
}
