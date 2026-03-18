import React, { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { startSession, updateQrToken, getAttendances, getMissingStudents, closeSession, updateAttendanceNote, clearAttendances } from '../../api/attendanceApi';
import './AttendanceModal.css';

const AttendanceModal = ({ isOpen, onClose, assignmentId, date, period, semester, className }) => {
    // Fallback for testing when assignmentId is missing
    const effectiveAssignmentId = assignmentId || "ASS001";
    const [sessionId, setSessionId] = useState(null);
    const [currentQrToken, setCurrentQrToken] = useState('');
    const [attendances, setAttendances] = useState([]);
    const [missingStudents, setMissingStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const initSession = async () => {
            try {
                setLoading(true);
                
                // Get teacher location
                let lat = null;
                let lng = null;
                
                if (navigator.geolocation) {
                    try {
                        const position = await new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                        });
                        lat = position.coords.latitude;
                        lng = position.coords.longitude;
                    } catch (e) {
                         console.warn("Could not get teacher location", e);
                    }
                }

                const session = await startSession(effectiveAssignmentId, date, period, semester, lat, lng);
                setSessionId(session.id);
                await updateToken(session.id);
            } catch (error) {
                console.error("Failed to start session", error);
                alert("Failed to create attendance session.");
                onClose();
            } finally {
                setLoading(false);
            }
        };

        if (assignmentId && date && period) {
            initSession();
        }
    }, [isOpen, assignmentId, date, period]);

    const updateToken = async (sId) => {
        if (!sId) return;
        const timestamp = new Date().getTime();
        const newToken = `${sId}-${timestamp}-${Math.random().toString(36).substring(7)}`;

        try {
            await updateQrToken(sId, newToken);
            setCurrentQrToken(newToken); // Update state AFTER successful backend update
        } catch (err) {
            console.error("Failed to update token", err);
        }
    };

    // 10-second interval for QR refresh
    useEffect(() => {
        if (!sessionId) return;

        const interval = setInterval(() => {
            updateToken(sessionId);
        }, 10000);

        return () => clearInterval(interval);
    }, [sessionId]);

    // 2-second interval for fetching attendees
    useEffect(() => {
        if (!sessionId) return;

        const fetchAttendances = async () => {
            try {
                const data = await getAttendances(sessionId);
                setAttendances(data);
                const missing = await getMissingStudents(sessionId);
                setMissingStudents(missing);
            } catch (err) {
                console.error("Error fetching attendances", err);
            }
        };

        const interval = setInterval(fetchAttendances, 2000);
        return () => clearInterval(interval);
    }, [sessionId]);

    const handleNoteChange = async (attendanceId, newNote) => {
        try {
            await updateAttendanceNote(attendanceId, newNote);
            setAttendances(prev => prev.map(a => a.id === attendanceId ? { ...a, note: newNote } : a));
        } catch (err) {
            console.error("Failed to update note", err);
        }
    };

    const handleSave = async () => {
        if (sessionId) {
            await closeSession(sessionId);
        }
        onClose();
    };

    // Tự động dùng địa chỉ hiện tại (localhost hoặc ngrok) để điện thoại quét được
    const studentUrl = `${window.location.origin}/attendance?sessionId=${sessionId}&token=${currentQrToken}`;

    const formatTime = (timeStr) => {
        if (!timeStr) return '--:--:--';
        // If it's a full ISO string or similar, take the HH:mm:ss part
        if (typeof timeStr === 'string' && timeStr.includes(':')) {
            const parts = timeStr.split(':');
            if (parts.length >= 3) return timeStr.substring(0, 8); // HH:mm:ss
            return timeStr;
        }
        return timeStr;
    };

    if (!isOpen) return null;

    return (
        <div className="attendance-modal-overlay">
            <div className="attendance-modal-card">
                <header className="modal-header">
                    <div className="header-info">
                        <h2>Điểm danh Tiết {period}</h2>
                        <p className="session-subtitle">Lớp {className || 'Đang cập nhật'}</p>
                    </div>
                    <button className="btn-close-x" onClick={onClose}>&times;</button>
                </header>

                <div className="attendance-modal-body">
                    <div className="qr-card">
                        <div className="qr-wrapper">
                            {(loading || !sessionId || !currentQrToken) ? (
                                <div className="qr-loading">
                                    <div className="pulse-spinner"></div>
                                    <p>Đang tạo mã...</p>
                                </div>
                            ) : (
                                <>
                                    <QRCodeCanvas
                                        value={studentUrl}
                                        size={220}
                                        level="H"
                                        includeMargin={true}
                                        imageSettings={{
                                            src: "/vite.svg",
                                            x: undefined,
                                            y: undefined,
                                            height: 40,
                                            width: 40,
                                            excavate: true,
                                        }}
                                    />
                                    <div className="qr-footer">
                                        <div className="timer-bar"><div className="timer-progress"></div></div>
                                        <p>Mã tự động đổi sau 10 giây</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="attendee-lists-wrapper">
                        <div className="attendee-list-container">
                            <div className="list-header">
                                <h3>Danh sách đã điểm danh</h3>
                                <span className="count-badge">{attendances.length} học sinh</span>
                            </div>

                            <div className="table-wrapper">
                                <div className="table-body-scroll">
                                    <table className="attendance-table">
                                        <thead>
                                            <tr>
                                                <th>Học sinh</th>
                                                <th>Thời gian</th>
                                                <th>Vị trí</th>
                                                <th>Trạng thái</th>
                                                <th>Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendances.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="empty-state">Chưa có ai điểm danh...</td>
                                                </tr>
                                            ) : (
                                                attendances.map((a, idx) => {
                                                    const isSafe = a.location && !a.location.includes("denied") && !a.location.includes("Lỗi") && !a.location.includes("Denied");
                                                    return (
                                                        <tr key={idx} className="attendee-row animate-in">
                                                            <td>
                                                                <div className="name-cell">
                                                                    <span className="student-name">{a.studentName}</span>
                                                                    <span className="student-class">{a.studentClass}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="time-text">{formatTime(a.checkInTime)}</span>
                                                            </td>
                                                            <td>
                                                                <span className="location-text" title={a.location}>
                                                                    {a.location ? (a.location.length > 20 ? a.location.substring(0, 20) + '...' : a.location) : '-'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className={`status-pill ${isSafe ? 'safe' : 'warning'}`}>
                                                                    {isSafe ? '✅ Hợp lệ' : '⚠️ Cảnh báo'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    defaultValue={a.note || ''}
                                                                    onBlur={(e) => handleNoteChange(a.id, e.target.value)}
                                                                    className="table-input"
                                                                    placeholder="..."
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="attendee-list-container missing-list">
                            <div className="list-header">
                                <h3>Danh sách chưa điểm danh</h3>
                                <span className="count-badge missing-badge">{missingStudents.length} học sinh</span>
                            </div>

                            <div className="table-wrapper">
                                <div className="table-body-scroll">
                                    <table className="attendance-table missing-table">
                                        <thead>
                                            <tr>
                                                <th>Mã VS</th>
                                                <th>Học sinh</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {missingStudents.length === 0 ? (
                                                <tr>
                                                    <td colSpan="2" className="empty-state">Đã điểm danh đủ (hoặc không có data)</td>
                                                </tr>
                                            ) : (
                                                missingStudents.map((ms, idx) => (
                                                    <tr key={idx} className="attendee-row animate-in">
                                                        <td>
                                                            <span className="student-code">{ms.studentCode}</span>
                                                        </td>
                                                        <td>
                                                            <div className="name-cell">
                                                                <span className="student-name">{ms.studentName}</span>
                                                                <span className="student-class">{ms.studentClass}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Hủy bỏ</button>
                    <button className="btn-reset" onClick={async () => {
                        if (window.confirm("Xóa hết danh sách này?")) {
                            await clearAttendances(sessionId);
                            setAttendances([]);
                        }
                    }}>Xóa trắng</button>
                    <button className="btn-primary" onClick={handleSave}>Hoàn tất điểm danh</button>
                </footer>
            </div>
        </div>
    );
};

export default AttendanceModal;