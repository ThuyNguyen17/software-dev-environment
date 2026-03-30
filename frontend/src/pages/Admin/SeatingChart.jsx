import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import ClassroomSeatingChartComponent from "../../components/ClassroomSeatingChart/ClassroomSeatingChart";
import { ClassesContainer, Content, ClassesContent, ClassHeader } from "../../styles/ClassesStyles";

const SeatingChart = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [allSeats, setAllSeats] = useState([]);
    const [assignments, setAssignments] = useState([]);
    
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedAssignment, setSelectedAssignment] = useState("");

    const fetchSeatingData = async () => {
        try {
            // 1. GỌI TẤT CẢ TÀI NGUYÊN (Students, StudentClasses, Môn Học / Phân Công)
            const [classRes, studentRes, assignRes] = await Promise.all([
                axios.get('http://localhost:8080/api/student-class'),
                axios.get('http://localhost:8080/api/students'),
                axios.get('http://localhost:8080/api/v1/teaching-assignments/all')
            ]);
            
            const studentClasses = classRes.data || [];
            const students = studentRes.data || [];
            setAssignments(assignRes.data || []);

            // 2. Nối Danh sách lấy Toạ độ và Profile
            const mappedRecords = studentClasses.map(sc => {
                const stu = students.find(s => s.id === sc.studentId || s.studentCode === sc.studentId) || {};
                
                return {
                    id: sc.id, 
                    studentId: sc.studentId,
                    name: stu.fullName || stu.name || 'Học sinh ẩn danh',
                    code: stu.studentCode || stu.id,
                    className: sc.classId || 'Lớp chưa phân', 
                    seatIndex: sc.seatIndex ?? null,
                    dob: stu.dateOfBirth || stu.dob || 'Chưa cập nhật',
                    gender: stu.gender || 'Chưa cập nhật'
                };
            });

            setAllSeats(mappedRecords);

            // Tự động gán Class đầu tiên
            const uniqueClasses = [...new Set(mappedRecords.map(s => s.className))].filter(Boolean);
            if (uniqueClasses.length > 0 && !selectedClass) {
                setSelectedClass(uniqueClasses[0]);
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu từ server: ', error);
        }
    };

    useEffect(() => {
        fetchSeatingData();
    }, []);

    // Filter Môn học theo Lớp
    const assignmentsInSelectedClass = useMemo(() => {
        if (!selectedClass) return [];
        return assignments.filter(a => a.className === selectedClass);
    }, [assignments, selectedClass]);

    // Lọc Học sinh theo lớp
    const studentsInSelectedClass = useMemo(() => {
        if (!selectedClass) return [];
        return allSeats.filter(stu => stu.className === selectedClass);
    }, [allSeats, selectedClass]);

    // Các Option Lớp Học của Select Box
    const classOptions = useMemo(() => {
        return [...new Set(allSeats.map(s => s.className))].filter(Boolean);
    }, [allSeats]);

    // Tự động gán Môn Học đầu tiên khi chọn Lớp
    useEffect(() => {
        if (assignmentsInSelectedClass.length > 0) {
            setSelectedAssignment(assignmentsInSelectedClass[0].id);
        } else {
            setSelectedAssignment("");
        }
    }, [assignmentsInSelectedClass]);

    return(
        <ClassesContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <ClassesContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <ClassHeader>Sơ đồ Lớp & Nhập Điểm</ClassHeader>
                        
                        <div style={{ display: 'flex', gap: '15px' }}>
                            {/* Dropdown 1: Chọn Lớp */}
                            {classOptions.length > 0 && (
                                <select 
                                    value={selectedClass} 
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    style={{
                                        padding: '10px 16px', borderRadius: '8px',
                                        border: '1px solid #cbd5e1', fontSize: '15px',
                                        fontWeight: '600', color: '#1e293b', outline: 'none',
                                        cursor: 'pointer', backgroundColor: 'white'
                                    }}
                                >
                                    {classOptions.map(cls => (
                                        <option key={cls} value={cls}>Lớp: {cls}</option>
                                    ))}
                                </select>
                            )}

                            {/* Dropdown 2: Chọn Môn Học đang Chấm Điểm */}
                            {assignmentsInSelectedClass.length > 0 ? (
                                <select 
                                    value={selectedAssignment} 
                                    onChange={(e) => setSelectedAssignment(e.target.value)}
                                    style={{
                                        padding: '10px 16px', borderRadius: '8px',
                                        border: '2px solid #3b82f6', fontSize: '15px',
                                        fontWeight: '700', color: '#1e40af', outline: 'none',
                                        cursor: 'pointer', backgroundColor: '#eff6ff'
                                    }}
                                >
                                    {assignmentsInSelectedClass.map(a => (
                                        <option key={a.id} value={a.id}>Môn: {a.subjectName}</option>
                                    ))}
                                </select>
                            ) : (
                                <div style={{ padding: '10px', background: '#fef2f2', color: '#ef4444', borderRadius: '8px', fontWeight: 'bold' }}>
                                    Lớp chưa có môn học
                                </div>
                            )}
                        </div>
                    </div>

                    {allSeats.length > 0 ? (
                        studentsInSelectedClass.length > 0 ? (
                            <div style={{ marginTop: '10px' }}>
                                <ClassroomSeatingChartComponent
                                    key={selectedClass} 
                                    students={studentsInSelectedClass}
                                    config={{ rows: 4, cols: 5 }} 
                                    selectedAssignmentId={selectedAssignment}
                                />
                            </div>
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                                Lớp này chưa có Học sinh nào đăng ký.
                            </div>
                        )
                    ) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                            Đang kết nối Server...
                        </div>
                    )}
                </ClassesContent>
            </Content>
        </ClassesContainer>
    )
}

export default SeatingChart;
