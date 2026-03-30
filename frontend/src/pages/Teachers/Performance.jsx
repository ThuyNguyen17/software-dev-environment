import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  GraduationCap,
  Search,
  ChevronLeft,
  Save,
  TrendingUp,
  Award,
  FileText
} from "lucide-react";
import { getClassesByTeacher, getStudentsInClass } from "../../api/classApi";
import { 
  getPerformanceByClass, 
  saveGrade, 
  getClassStatistics 
} from "../../api/performanceApi";
import { getExamsByClass } from "../../api/examApi";
import "./TeacherPerformance.css";

const TeacherPerformance = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classStats, setClassStats] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const teacherId = user.teacherId || user.userId;

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      if (!teacherId) {
        console.error("Teacher ID is missing from localStorage");
        setError("Không tìm thấy thông tin giáo viên. Vui lòng đăng nhập lại.");
        return;
      }
      
      console.log("Fetching classes for teacher:", teacherId);
      const data = await getClassesByTeacher(teacherId);
      console.log("Classes loaded:", data);
      setClasses(data || []);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError("Không thể tải danh sách lớp: " + (err.message || "Lỗi không xác định"));
    }
  };

  const fetchClassData = async (classId) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching data for class:", classId);
      const [studentsData, examsData, performanceData, stats] = await Promise.all([
        getStudentsInClass(classId),
        getExamsByClass(classId),
        getPerformanceByClass(classId),
        getClassStatistics(classId)
      ]);
      
      console.log("Students:", studentsData);
      console.log("Exams:", examsData);
      
      // Chỉ lấy điểm kiểm tra (exams) - không lấy assignments
      const enrichedStudents = (studentsData || []).map(s => ({
        ...s,
        examGrades: (examsData || []).map(e => ({
          examId: e.id,
          score: 0,
          maxScore: e.maxScore || 10
        }))
      }));
      
      setStudents(enrichedStudents);
      setExams(examsData || []);
      setClassStats(stats);
      
    } catch (err) {
      console.error("Error fetching class data:", err);
      setError("Không thể tải dữ liệu lớp: " + (err.message || "Lỗi không xác định"));
    } finally {
      setLoading(false);
    }
  };

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    fetchClassData(classItem.id);
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setStudents([]);
    setSearchTerm("");
  };

  const handleGradeChange = (studentId, type, itemId, newScore) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        if (type === "assignment") {
          return {
            ...student,
            assignmentGrades: student.assignmentGrades.map(g =>
              g.assignmentId === itemId ? { ...g, score: parseFloat(newScore) || 0 } : g
            )
          };
        } else {
          return {
            ...student,
            examGrades: student.examGrades.map(g =>
              g.examId === itemId ? { ...g, score: parseFloat(newScore) || 0 } : g
            )
          };
        }
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const calculateAverage = (student) => {
    if (!student.examGrades || student.examGrades.length === 0) return "0.00";
    
    let totalScore = 0;
    let totalMaxScore = 0;

    // Tính điểm TB từ các bài kiểm tra (exams)
    student.examGrades.forEach(g => {
      totalScore += g.score;
      totalMaxScore += g.maxScore;
    });

    return totalMaxScore > 0 ? ((totalScore / totalMaxScore) * 10).toFixed(2) : "0.00";
  };

  const getRankColor = (score) => {
    if (score >= 8.5) return "excellent";
    if (score >= 7.0) return "good";
    if (score >= 5.0) return "average";
    return "poor";
  };

  const handleSaveGrades = async () => {
    try {
      // Chỉ lưu điểm kiểm tra
      for (const student of students) {
        for (const grade of student.examGrades) {
          await saveGrade({
            studentId: student.id,
            examId: grade.examId,
            score: grade.score,
            type: 'exam'
          });
        }
      }
      alert("Đã lưu điểm thành công!");
    } catch (err) {
      console.error("Error saving grades:", err);
      alert("Không thể lưu điểm. Vui lòng thử lại.");
    }
  };

  const filteredStudents = students.filter(s =>
    (s.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (s.studentCode?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // View: Danh sách lớp
  if (!selectedClass) {
    return (
      <div className="teacher-performance-container">
        <div className="page-header">
          <h1 className="page-title">
            <BookOpen size={28} />
            Quản lý điểm số
          </h1>
          <p className="page-subtitle">Chọn lớp để nhập và xem điểm sinh viên</p>
        </div>

        {error && <div className="error-state">{error}</div>}

        <div className="classes-grid">
          {classes.map((classItem) => (
            <div 
              key={classItem.id} 
              className="class-card"
              onClick={() => handleClassClick(classItem)}
            >
              <div className="class-header">
                <div className="class-icon">
                  <GraduationCap size={24} />
                </div>
                <div className="class-info">
                  <h3 className="class-name">{classItem.name}</h3>
                  <span className="class-subject">{classItem.subject}</span>
                </div>
              </div>
              
              <div className="class-stats">
                <div className="stat">
                  <BookOpen size={16} />
                  <span>{classItem.studentCount || 0} sinh viên</span>
                </div>
              </div>

              <div className="class-action">
                <span>Xem điểm</span>
                <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // View: Bảng điểm lớp
  return (
    <div className="teacher-performance-container">
      <div className="page-header">
        <button className="back-button" onClick={handleBackToClasses}>
          <ChevronLeft size={20} />
          Quay lại danh sách lớp
        </button>
        
        <div className="header-content">
          <div>
            <h1 className="page-title">
              <BookOpen size={28} />
              {selectedClass.name} - Điểm số
            </h1>
            <p className="page-subtitle">
              Môn: {selectedClass.subject} | Tổng: {students.length} sinh viên
            </p>
          </div>
          
          <div className="header-actions">
            {classStats && (
              <div className="stats-summary">
                <div className="stat-item">
                  <TrendingUp size={16} />
                  <span>TB: {classStats.average?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="stat-item excellent">
                  <Award size={16} />
                  <span>Giỏi: {classStats.excellentCount || 0}</span>
                </div>
                <div className="stat-item good">
                  <Award size={16} />
                  <span>Khá: {classStats.goodCount || 0}</span>
                </div>
              </div>
            )}
            <button className="save-btn" onClick={handleSaveGrades}>
              <Save size={18} />
              Lưu điểm
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="page-header-info">
        <h2>Điểm kiểm tra - {exams.length} bài</h2>
      </div>

      <div className="search-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Đang tải...</div>
      ) : (
        <div className="performance-table-container">
          <table className="performance-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã SV</th>
                <th>Họ và tên</th>
                {exams.map(e => <th key={e.id}>{e.title}</th>)}
                <th>Điểm TB</th>
                <th>Xếp loại</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td className="student-code">{student.studentCode}</td>
                  <td className="student-name">{student.fullName}</td>
                  
                  {exams.map(exam => {
                    const grade = student.examGrades?.find(g => g.examId === exam.id);
                    return (
                      <td key={exam.id}>
                        <input
                          type="number"
                          min="0"
                          max={exam.maxScore}
                          step="0.5"
                          value={grade?.score || 0}
                          onChange={(e) => handleGradeChange(student.id, "exam", exam.id, e.target.value)}
                          className="grade-input"
                        />
                      </td>
                    );
                  })}
                  
                  <td className="average-score">
                    {calculateAverage(student)}
                  </td>
                  <td>
                    <span className={`rank-badge ${getRankColor(parseFloat(calculateAverage(student)))}`}>
                      {parseFloat(calculateAverage(student)) >= 8.5 ? "Giỏi" :
                       parseFloat(calculateAverage(student)) >= 7.0 ? "Khá" :
                       parseFloat(calculateAverage(student)) >= 5.0 ? "TB" : "Yếu"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="empty-state">
              Không tìm thấy sinh viên nào
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherPerformance;
