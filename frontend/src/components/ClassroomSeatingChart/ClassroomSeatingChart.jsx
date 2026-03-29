import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// ==========================================
// 1. CÁC ĐỊNH NGHĨA STYLED-COMPONENTS
// ==========================================

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex; gap: 30px; padding: 24px;
  background: #f8fafc; min-height: 80vh;
  font-family: 'Inter', 'Roboto', sans-serif;
  animation: ${fadeIn} 0.5s ease-out;
  @media (max-width: 900px) { flex-direction: column; }
`;

const MainGridSection = styled.div`
  flex: 1; background: white; border-radius: 16px;
  padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex; flex-direction: column; align-items: center;
`;

const TeacherDesk = styled.div`
  width: 60%; padding: 16px; background: linear-gradient(135deg, #1e293b, #334155);
  color: white; text-align: center; border-radius: 8px; font-weight: 600;
  letter-spacing: 1px; margin-bottom: 40px;
  box-shadow: 0 4px 15px rgba(30, 41, 59, 0.3); position: relative;
  &::after {
    content: ''; position: absolute; bottom: -15px; left: 50%;
    transform: translateX(-50%); width: 2px; height: 15px; background: #cbd5e1;
  }
`;

const SeatingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  gap: 20px; width: 100%; max-width: 800px;
`;

const SeatCard = styled.div`
  background: ${props => props.isEmpty ? '#f1f5f9' : 'linear-gradient(135deg, #ffffff, #f8fafc)'};
  border: 2px ${props => props.isEmpty ? 'dashed #cbd5e1' : 'solid #e2e8f0'};
  border-radius: 12px; padding: 16px; height: 100px;
  display: flex; flex-direction: column; justify-content: center;
  align-items: center; text-align: center;
  cursor: ${props => props.isEmpty ? 'default' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isEmpty ? 'none' : '0 4px 6px rgba(0,0,0,0.02)'};
  &:hover {
    transform: ${props => props.isEmpty ? 'none' : 'translateY(-4px)'};
    box-shadow: ${props => props.isEmpty ? 'none' : '0 10px 15px rgba(0,0,0,0.05)'};
    border-color: ${props => props.isEmpty ? '#94a3b8' : '#3b82f6'};
  }
  &.drag-over { border-color: #3b82f6; background: #eff6ff; }
`;

const SeatAvatar = styled.div`
  width: 40px; height: 40px; border-radius: 50%;
  background: ${props => props.isEmpty ? '#e2e8f0' : '#dbeafe'};
  color: ${props => props.isEmpty ? '#94a3b8' : '#1d4ed8'};
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; font-size: 16px; margin-bottom: 8px;
`;

const SeatName = styled.div`
  font-size: 14px; font-weight: 500;
  color: ${props => props.isEmpty ? '#94a3b8' : '#334155'}; line-height: 1.2;
`;

const Sidebar = styled.div`
  width: 320px; background: white; border-radius: 16px;
  padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex; flex-direction: column;
  @media (max-width: 900px) { width: 100%; }
`;

const SidebarTitle = styled.h3`
  margin: 0 0 16px 0; color: #1e293b; font-size: 18px;
  display: flex; justify-content: space-between; align-items: center;
`;

const Badge = styled.span`
  background: #fee2e2; color: #ef4444; padding: 4px 10px;
  border-radius: 20px; font-size: 12px; font-weight: bold;
`;

const WaitingListArea = styled.div`
  flex: 1; min-height: 200px; background: #f8fafc;
  border-radius: 12px; padding: 12px; border: 2px dashed #cbd5e1;
  overflow-y: auto;
  &.drag-over { border-color: #3b82f6; background: #eff6ff; }
`;

const WaitingItemCard = styled.div`
  background: white; border: 1px solid #e2e8f0; border-radius: 8px;
  padding: 12px; margin-bottom: 10px; display: flex; align-items: center;
  gap: 12px; cursor: grab; box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
  &:active { cursor: grabbing; }
`;

// -- Styles Modal Chấm Điểm --
const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 999; animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div`
  background: white; border-radius: 20px; width: 95%; max-width: 500px;
  overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); position: relative;
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;
  padding: 24px; text-align: center;
`;

const CloseButton = styled.button`
  position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.2);
  border: none; border-radius: 50%; width: 32px; height: 32px; color: white;
  font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  &:hover { background: rgba(255,255,255,0.4); }
`;

const ModalBody = styled.div`
  padding: 24px; max-height: 60vh; overflow-y: auto;
`;

const InfoRow = styled.div`
  display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;
`;
const InfoLabel = styled.span`color: #64748b; font-weight: 500; font-size: 14px;`;
const InfoValue = styled.span`color: #0f172a; font-weight: 600; font-size: 14px;`;

const ScoreGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;
`;
const ScoreField = styled.div`
  display: flex; flex-direction: column; gap: 6px;
`;
const ScoreInput = styled.input`
  padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1;
  font-size: 16px; font-weight: bold; text-align: center; color: #1e293b;
  &:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  &::placeholder { color: #94a3b8; font-weight: normal; }
`;


// ==========================================
// 2. COMPONENT CHÍNH
// ==========================================

const ClassroomSeatingChart = ({ students = [], config = { rows: 3, cols: 3 }, selectedAssignmentId }) => {
  const [seats, setSeats] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // State quản lý điểm số của toàn lớp đối với môn học hiện tại
  const [classScores, setClassScores] = useState([]);
  
  // State Form nhập điểm cho Modal
  const [currentScoreForm, setCurrentScoreForm] = useState({
      ORAL: '', QUIZ_15: '', ONE_PERIOD: '', MIDTERM: '', FINAL: ''
  });

  // --- FETCH ĐIỂM SỐ KHI ĐỔI MÔN ---
  useEffect(() => {
      const fetchAssignmentScores = async () => {
          if (!selectedAssignmentId) return setClassScores([]);
          try {
              const res = await axios.get(`http://localhost:8080/api/scores/assignment/${selectedAssignmentId}`);
              setClassScores(res.data || []);
          } catch (error) {
              console.error("Lỗi lấy điểm môn học: ", error);
          }
      };
      fetchAssignmentScores();
  }, [selectedAssignmentId]);


  // --- MAPPING GHẾ DỰA TRÊN SEAT_INDEX Mongo ---
  useEffect(() => {
    const totalSeats = config.rows * config.cols;
    const newSeats = Array(totalSeats).fill(null);
    const newWaiting = [];

    // Lần 1: Xếp những ai ĐÃ CÓ seatIndex vào ghế
    students.forEach((student) => {
        if (student.seatIndex !== null && student.seatIndex !== undefined && student.seatIndex < totalSeats) {
            newSeats[student.seatIndex] = student;
        }
    });

    // Lần 2: Những ai CHƯA CÓ ghế, tự động nạp vào chỗ trống đầu tiên tìm được
    students.forEach((student) => {
        if (student.seatIndex === null || student.seatIndex === undefined || student.seatIndex >= totalSeats) {
            const emptyIndex = newSeats.findIndex(seat => seat === null);
            if (emptyIndex !== -1) {
                newSeats[emptyIndex] = student; // Xếp tạm vào ghế trống
                // Lưu tức thì vị trí khởi tạo lên Mongo để có Persistence
                syncToMongoDB(student.id, emptyIndex); 
            } else {
                newWaiting.push(student); // Hết ghế thì đẩy xuống waiting list
            }
        }
    });

    setSeats(newSeats);
    setWaitingList(newWaiting);
  }, [students, config]);


  // HÀM QUẢN LÝ GHẾ NGỒI (MongoDB)
  const syncToMongoDB = async (studentClassId, seatIndexValue) => {
      try {
          await axios.put(`http://localhost:8080/api/student-class/${studentClassId}/seat`, {
              seatIndex: seatIndexValue
          });
      } catch (err) { console.error("Lỗi đồng bộ chỗ ngồi: ", err); }
  };


  // --- Events DRAG & DROP ---
  const handleOpenModal = (student) => { 
      if (!student) return;
      
      // Load Điểm từ Context classScores vào form
      const scoreRecord = classScores.find(s => s.studentId === student.studentId);
      const newForm = { ORAL: '', QUIZ_15: '', ONE_PERIOD: '', MIDTERM: '', FINAL: '' };
      
      if (scoreRecord && scoreRecord.items) {
          scoreRecord.items.forEach(item => {
              if (item && item.type) {
                  newForm[item.type] = item.value !== null ? item.value : '';
              }
          });
      }
      
      setCurrentScoreForm(newForm);
      setSelectedStudent(student); 
  };
  
  const handleCloseModal = () => setSelectedStudent(null);

  // XỬ LÝ NHẬP ĐIỂM TRỰC TIẾP
  const handleScoreChange = (type, value) => {
      if (value < 0 || value > 10) return; // Basic validation
      setCurrentScoreForm(prev => ({ ...prev, [type]: value }));
  };

  const handleScoreBlur = async (type) => {
      if (!selectedAssignmentId || !selectedStudent) return alert("Vui lòng chọn môn học ở thanh Công Cụ trước khi chấm điểm!");
      
      const valStr = currentScoreForm[type];
      if (valStr === '' || valStr === undefined) return; // Nếu trống thì bỏ qua hoặc tuỳ specs xoá điểm
      
      try {
          // Chuẩn bị payload theo cấu trúc ScoreItem Mongo
          const newItems = [{
              type: type,
              value: parseFloat(valStr)
          }];
          
          await axios.put(`http://localhost:8080/api/scores/student/${selectedStudent.studentId}/assignment/${selectedAssignmentId}`, newItems);
          console.log(`Đã Cập nhật điểm ${type} = ${valStr}`);
      } catch (e) {
          alert('Lưu điểm thất bại, kiểm tra kết nối Server.');
      }
  };


  const handleDragStart = (e, source, index) => {
    setDraggedItem({ source, index });
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { if(e.target) e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    if(e.target) e.target.style.opacity = '1';
    setDraggedItem(null);
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  };

  const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
  const handleDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };

  const handleDropOnSeat = (e, dropIndex) => {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    if (!draggedItem) return;

    const { source, index: dragIndex } = draggedItem;
    const newSeats = [...seats];
    const newWaiting = [...waitingList];

    if (source === 'SEAT') {
      if (dragIndex === dropIndex) return;
      const studentA = newSeats[dragIndex];
      const studentB = newSeats[dropIndex];
      newSeats[dragIndex] = studentB; newSeats[dropIndex] = studentA;
      setSeats(newSeats);

      if(studentA) syncToMongoDB(studentA.id, dropIndex);
      if(studentB) syncToMongoDB(studentB.id, dragIndex);
    } 
    else if (source === 'WAITING') {
      const studentToMove = newWaiting[dragIndex];
      const studentInSeat = newSeats[dropIndex];
      newSeats[dropIndex] = studentToMove;
      newWaiting.splice(dragIndex, 1);
      if (studentInSeat) newWaiting.push(studentInSeat);

      setSeats(newSeats); setWaitingList(newWaiting);

      if(studentToMove) syncToMongoDB(studentToMove.id, dropIndex);
      if(studentInSeat) syncToMongoDB(studentInSeat.id, null); 
    }
  };

  const handleDropOnWaitingList = (e) => {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    if (!draggedItem) return;
    const { source, index: dragIndex } = draggedItem;

    if (source === 'SEAT') {
      const studentToMove = seats[dragIndex];
      if (!studentToMove) return;
      const newSeats = [...seats]; newSeats[dragIndex] = null; 
      const newWaiting = [...waitingList, studentToMove];
      
      setSeats(newSeats); setWaitingList(newWaiting);
      syncToMongoDB(studentToMove.id, null); 
    }
  };

  return (
    <Container>
      <MainGridSection>
        <TeacherDesk>BẢNG / BÀN GIÁO VIÊN</TeacherDesk>
        <SeatingGrid cols={config.cols}>
          {seats.map((student, index) => (
            <SeatCard 
              key={`seat-${index}`} isEmpty={!student} draggable={!!student} 
              onDragStart={(e) => handleDragStart(e, 'SEAT', index)}
              onDragEnd={handleDragEnd} onDragOver={handleDragOver}
              onDragLeave={handleDragLeave} onDrop={(e) => handleDropOnSeat(e, index)}
              onClick={() => handleOpenModal(student)}
            >
              <SeatAvatar isEmpty={!student}>
                {student ? student.name.charAt(0).toUpperCase() : '+'}
              </SeatAvatar>
              <SeatName isEmpty={!student}>
                {student ? student.name : 'Ghế trống'}
              </SeatName>
            </SeatCard>
          ))}
        </SeatingGrid>
      </MainGridSection>

      <Sidebar>
        <SidebarTitle>Hàng đợi xếp chỗ
          {waitingList.length > 0 && <Badge>{waitingList.length}</Badge>}
        </SidebarTitle>
        <WaitingListArea 
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDropOnWaitingList}
        >
          {waitingList.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px' }}>Trống.</div>
          ) : (
            waitingList.map((student, index) => (
              <WaitingItemCard
                key={`wait-${student.id || index}`} draggable
                onDragStart={(e) => handleDragStart(e, 'WAITING', index)} onDragEnd={handleDragEnd}
              >
                <SeatAvatar style={{ width: 32, height: 32, fontSize: 14 }}>
                  {student.name.charAt(0).toUpperCase()}
                </SeatAvatar>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>{student.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Mã: {student.code || student.id}</div>
                </div>
              </WaitingItemCard>
            ))
          )}
        </WaitingListArea>
      </Sidebar>

      {/* POPUP: XEM THÔNG TIN & NHẬP ĐIỂM */}
      {selectedStudent && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h2 style={{ margin: 0, fontSize: 20 }}>Thông tin & Chấm Điểm</h2>
              <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              {/* Profile Preview */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                  <SeatAvatar style={{ width: 56, height: 56, fontSize: 24, margin: 0 }}>
                    {selectedStudent.name.charAt(0).toUpperCase()}
                  </SeatAvatar>
                  <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{selectedStudent.name}</div>
                      <div style={{ fontSize: 14, color: '#64748b' }}>{selectedStudent.code} • Lớp {selectedStudent.className}</div>
                  </div>
              </div>
              
              <h3 style={{ fontSize: 16, color: '#1e293b', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>Bảng Điểm Cá Nhân</h3>
              
              {!selectedAssignmentId ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444', background: '#fef2f2', borderRadius: '8px' }}>
                      Vui lòng chọn môn học trên thanh tuỳ chọn (Dropdown Menu) trước khi chấm điểm.
                  </div>
              ) : (
                  <ScoreGrid>
                      <ScoreField>
                          <InfoLabel>Miệng</InfoLabel>
                          <ScoreInput type="number" step="0.5" placeholder="--" 
                              value={currentScoreForm.ORAL} onChange={e => handleScoreChange('ORAL', e.target.value)} onBlur={() => handleScoreBlur('ORAL')} />
                      </ScoreField>
                      <ScoreField>
                          <InfoLabel>15 Phút</InfoLabel>
                          <ScoreInput type="number" step="0.5" placeholder="--" 
                              value={currentScoreForm.QUIZ_15} onChange={e => handleScoreChange('QUIZ_15', e.target.value)} onBlur={() => handleScoreBlur('QUIZ_15')} />
                      </ScoreField>
                      <ScoreField>
                          <InfoLabel>1 Tiết</InfoLabel>
                          <ScoreInput type="number" step="0.5" placeholder="--" 
                              value={currentScoreForm.ONE_PERIOD} onChange={e => handleScoreChange('ONE_PERIOD', e.target.value)} onBlur={() => handleScoreBlur('ONE_PERIOD')} />
                      </ScoreField>
                      <ScoreField>
                          <InfoLabel>Giữa Kỳ</InfoLabel>
                          <ScoreInput type="number" step="0.5" placeholder="--" 
                              value={currentScoreForm.MIDTERM} onChange={e => handleScoreChange('MIDTERM', e.target.value)} onBlur={() => handleScoreBlur('MIDTERM')} />
                      </ScoreField>
                      <ScoreField style={{ gridColumn: '1 / span 2' }}>
                          <InfoLabel style={{ textAlign: 'center', color: '#1d4ed8' }}>CUỐI KỲ</InfoLabel>
                          <ScoreInput type="number" step="0.5" placeholder="--" style={{ borderColor: '#bfdbfe', background: '#eff6ff' }}
                              value={currentScoreForm.FINAL} onChange={e => handleScoreChange('FINAL', e.target.value)} onBlur={() => handleScoreBlur('FINAL')} />
                      </ScoreField>
                  </ScoreGrid>
              )}
            </ModalBody>
            <div style={{ padding: 16, background: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ fontSize: 13, color: '#64748b', marginRight: '20px' }}>Mọi thay đổi trên ô nhập liệu sẽ tự động lưu thẳng xuống máy chủ!</span>
                <button 
                  onClick={handleCloseModal}
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 30px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
                >
                  Xong
                </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ClassroomSeatingChart;
