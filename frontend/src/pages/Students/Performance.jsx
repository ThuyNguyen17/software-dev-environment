import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import styled from "styled-components";

const PerformanceContainer = styled.div`
  display: flex; min-height: 100vh; background: #f8fafc; font-family: 'Inter', sans-serif;
`;
const Content = styled.div`
  flex: 1; margin-left: ${({ isOpen }) => (isOpen ? '270px' : '80px')};
  padding: 30px; transition: margin 0.3s;
  @media (max-width: 900px) { margin-left: 0; padding: 20px; }
`;
const TableContainer = styled.div`
  background: white; border-radius: 12px; padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow-x: auto;
`;
const ScoreTable = styled.table`
  width: 100%; border-collapse: collapse; min-width: 800px;
`;
const Th = styled.th`
  background: #f1f5f9; color: #475569; padding: 16px; text-align: left;
  font-weight: 600; border-bottom: 2px solid #e2e8f0; white-space: nowrap;
`;
const Td = styled.td`
  padding: 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b;
`;
const Badge = styled.span`
  background: #fef2f2; color: #ef4444; padding: 4px 8px; border-radius: 4px;
  font-size: 13px; font-weight: 500; white-space: nowrap;
`;
const HeaderTitle = styled.h2`
  color: #0f172a; margin-bottom: 24px; font-weight: 700;
`;

const PerformanceSection = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (!storedUser) return;
                const user = JSON.parse(storedUser);
                const studentId = user.studentId;

                const res = await axios.get(`http://localhost:8080/api/scores/student/${studentId}`);
                setScores(res.data || []);
            } catch (error) {
                console.error("Lỗi khi tải điểm số: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchScores();
    }, []);

    // Helper: Định dạng hiển thị bắt buộc theo yêu cầu (Không có điểm -> Chưa Cập Nhật)
    const formatScore = (val) => {
        if (val === null || val === undefined) {
            return <Badge>Chưa Cập Nhật</Badge>;
        }
        return <span style={{ fontWeight: 600, color: '#3b82f6' }}>{val.toFixed(1)}</span>;
    };

    return(
        <PerformanceContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <HeaderTitle>Bảng Điểm Cá Nhân</HeaderTitle>
                
                <TableContainer>
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Đang tải dữ liệu điểm...</div>
                    ) : scores.length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Bạn chưa có điểm số nào.</div>
                    ) : (
                        <ScoreTable>
                            <thead>
                                <tr>
                                    <Th>Môn Học</Th>
                                    <Th>Lớp</Th>
                                    <Th>Giữa Kỳ</Th>
                                    <Th>Cuối Kỳ</Th>
                                    <Th style={{ textAlign: 'center' }}>Hệ số 1 (Miệng/15p)</Th>
                                    <Th>Tổng Kết</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((item, index) => {
                                    const { scores: sc } = item;
                                    // Tính điểm trung bình (Formula minh hoạ)
                                    let avg = null;
                                    if (sc.MIDTERM !== undefined && sc.FINAL !== undefined) {
                                        let h1 = 0, count = 0;
                                        if (sc.ORAL !== undefined) { h1 += sc.ORAL; count++; }
                                        if (sc.QUIZ_15 !== undefined) { h1 += sc.QUIZ_15; count++; }
                                        const h1Avg = count > 0 ? h1/count : 0;
                                        const finalAvg = (h1Avg + (sc.MIDTERM * 2) + (sc.FINAL * 3)) / (count > 0 ? 6 : 5);
                                        avg = finalAvg;
                                    }

                                    return (
                                        <tr key={index}>
                                            <Td style={{ fontWeight: 600 }}>{item.subjectName}</Td>
                                            <Td>{item.className}</Td>
                                            <Td>{formatScore(sc?.MIDTERM)}</Td>
                                            <Td>{formatScore(sc?.FINAL)}</Td>
                                            <Td align="center">
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    {formatScore(sc?.ORAL)} | {formatScore(sc?.QUIZ_15)}
                                                </div>
                                            </Td>
                                            <Td>{avg !== null ? <span style={{ fontSize: 18, fontWeight: 'bold', color: avg >= 5 ? '#10b981' : '#ef4444' }}>{avg.toFixed(1)}</span> : <Badge>Chưa Xếp Loại</Badge>}</Td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </ScoreTable>
                    )}
                </TableContainer>
            </Content>
        </PerformanceContainer>
    )
}

export default PerformanceSection;