import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return;
      const u = JSON.parse(stored);
      if (u) setUser(u);
    } catch {
      // ignore
    }
  }, []);

  const goToApp = () => {
    if (!user?.role) {
      navigate("/student/login");
      return;
    }
    if (user.role === "TEACHER") navigate("/teacher/timetable");
    else if (user.role === "STUDENT") navigate("/student/dashboard");
    else navigate("/student/login");
  };

  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="home-title">S-Attendance</h1>
        <img className="home-image" src="/vite.svg" alt="logo" />
        <p className="home-subtitle">
          Trang home demo (cố tình xấu). Vào đăng nhập rồi mới xem được nội dung.
        </p>

        {user ? (
          <div className="home-user">
            <div>Đang đăng nhập: {user.fullName || user.username}</div>
            <div>Quyền: {user.role}</div>
          </div>
        ) : (
          <div className="home-user">Chưa đăng nhập</div>
        )}

        <div className="home-actions">
          <button className="home-btn primary" onClick={() => navigate("/student/login")}>
            Đăng nhập
          </button>
          <button className="home-btn" onClick={goToApp}>
            Vào nội dung
          </button>
        </div>

        <div className="home-demo">
          <div>Demo tài khoản:</div>
          <div>Giảng viên: `gv001` / `password123`, `gv002` / `password123`</div>
          <div>Học sinh: `hs001`..`hs004` / `password123`, ngoài lớp: `hs999` / `password123`</div>
        </div>
      </div>
    </div>
  );
}

