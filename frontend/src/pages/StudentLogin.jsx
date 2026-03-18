import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/studentApi';
import './StudentLogin.css';

const StudentLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) return;

        setLoading(true);
        setError('');
        try {
            const user = await login(username, password);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'STUDENT') {
                navigate('/student/dashboard');
            } else if (user.role === 'LECTURER') {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Tài khoản hoặc mật khẩu không đúng');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>S-Attendance</h1>
                    <p>Hệ thống điểm danh thông minh</p>
                </div>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label>Tài khoản</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tài khoản"
                            autoFocus
                        />
                    </div>
                    <div className="input-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>Dành cho Học sinh / Sinh viên</p>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
