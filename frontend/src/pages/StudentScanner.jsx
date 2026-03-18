import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { recordAttendance } from '../api/attendanceApi';
import { ArrowLeft, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import './StudentScanner.css';

const StudentScanner = () => {
    const [student, setStudent] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, scanning, recording, success, error
    const [errorMsg, setErrorMsg] = useState('');
    const [location, setLocation] = useState('');
    const scannerRef = useRef(null);
    const studentRef = useRef(null);
    const locationRef = useRef('Đang lấy vị trí...');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/student/login');
            return;
        }
        const s = JSON.parse(storedUser);
        setStudent(s);
        studentRef.current = s;

        // Define function to get location inside effect
        const fetchInitialLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const locStr = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
                        console.log("Location obtained:", locStr);
                        setLocation(locStr);
                        locationRef.current = locStr;
                    },
                    (err) => {
                        console.warn("Location error:", err);
                        const errStr = `0.0, 0.0 (Lỗi: ${err.message})`;
                        setLocation(errStr);
                        locationRef.current = errStr;
                    },
                    { enableHighAccuracy: true, timeout: 5000 }
                );
            } else {
                setLocation('0.0, 0.0 (Lỗi: GPS không được hỗ trợ)');
                locationRef.current = '0.0, 0.0 (Lỗi: GPS không được hỗ trợ)';
            }
        };

        fetchInitialLocation();

        // Check for session in URL (direct scan)
        const queryParams = new URLSearchParams(window.location.search);
        const qSessionId = queryParams.get('sessionId');
        const qToken = queryParams.get('token');

        if (qSessionId && qToken) {
            handleRecordAttendance(qSessionId, qToken, s);
        }
    }, [navigate]);

    useEffect(() => {
        if (status === 'idle') {
            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            const config = { fps: 10, qrbox: { width: 250, height: 250 } };

            html5QrCode.start(
                { facingMode: "environment" },
                config,
                onScanSuccess
            ).catch(err => {
                console.error("Scanner fail", err);
                html5QrCode.start({ facingMode: "user" }, config, onScanSuccess);
            });

            return () => {
                if (html5QrCode.isScanning) {
                    html5QrCode.stop().catch(e => console.error(e));
                }
            };
        }
    }, [status]);

    const onScanSuccess = async (decodedText) => {
        try {
            const url = new URL(decodedText);
            const sessionId = url.searchParams.get('sessionId');
            const token = url.searchParams.get('token');

            if (sessionId && token) {
                if (scannerRef.current && scannerRef.current.isScanning) {
                    await scannerRef.current.stop();
                }
                handleRecordAttendance(sessionId, token);
            }
        } catch (e) {
            console.error("Scan error", e);
        }
    };

    const getLocationPromise = () => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve('0.0, 0.0 (Lỗi: GPS không được hỗ trợ)');
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`);
                },
                (err) => {
                    resolve(`0.0, 0.0 (Lỗi: ${err.message})`);
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        });
    };

    const handleRecordAttendance = async (sessionId, token, directStudent = null) => {
        const studentData = directStudent || studentRef.current || student;
        if (!studentData) {
            setErrorMsg("Hệ thống chưa nhận diện được sinh viên. Hãy đăng nhập lại.");
            setStatus('error');
            return;
        }

        setStatus('recording');
        
        let finalLocation = locationRef.current;
        if (finalLocation === 'Đang lấy vị trí...') {
            finalLocation = await getLocationPromise();
            setLocation(finalLocation);
            locationRef.current = finalLocation;
        }

        try {
            await recordAttendance({
                sessionId,
                qrToken: token,
                studentId: studentData.studentId,
                studentName: studentData.fullName,
                studentClass: studentData.className,
                location: finalLocation,
                note: ""
            });
            setStatus('success');
            if (window.navigator.vibrate) window.navigator.vibrate([200, 100, 200]);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Lỗi điểm danh. Hãy thử lại.");
            setStatus('error');
        }
    };

    return (
        <div className="scanner-page">
            <header className="scanner-header">
                <button onClick={() => navigate('/student/dashboard')} className="back-btn">
                    <ArrowLeft size={24} />
                </button>
                <h2>Quét Mã Điểm Danh</h2>
            </header>

            <main className="scanner-main">
                {status === 'idle' && (
                    <div className="scanner-container">
                        <div id="reader"></div>
                        <div className="location-info">
                            <MapPin size={16} />
                            <span>GPS: {location || 'Đang xác định...'}</span>
                        </div>
                    </div>
                )}

                {status === 'recording' && (
                    <div className="status-container">
                        <div className="spinner"></div>
                        <p>Đang ghi nhận dữ liệu...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="status-container success">
                        <CheckCircle size={64} color="#16a34a" />
                        <h2>Thành Công!</h2>
                        <p>Bạn đã điểm danh thành công.</p>
                        <div className="success-actions">
                            <button onClick={() => navigate('/student/history')} className="primary-btn">Xem Lịch Sử</button>
                            <button onClick={() => navigate('/student/dashboard')} className="secondary-btn">Về Trang Chủ</button>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="status-container error">
                        <AlertCircle size={64} color="#ef4444" />
                        <h2>Lỗi!</h2>
                        <p>{errorMsg}</p>
                        <button onClick={() => setStatus('idle')} className="primary-btn">Quét Lại</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentScanner;
