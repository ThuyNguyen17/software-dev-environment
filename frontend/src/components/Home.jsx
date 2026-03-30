import React from "react";
import { useNavigate } from "react-router-dom";
import { LoremIpsum } from "lorem-ipsum";
import { GraduationCap, BookOpen, Users, Calendar, Award, ArrowRight } from "lucide-react";
import "./Home.css";
import bg from "../assets/bg.png";

const lorem = new LoremIpsum();

const Home = () => {
    const navigate = useNavigate();
    const loremText = lorem.generateParagraphs(1);

    const handleLoginClick = () => {
        navigate('/student/login');
    };

    const features = [
        {
            icon: GraduationCap,
            title: "Qu?n lý H?c sinh",
            description: "Theo dõi thông tin, di?m s? và l?ch h?c c?a h?c sinh"
        },
        {
            icon: BookOpen,
            title: "Qu?n lý L?p h?c",
            description: "T? ch?c và qu?n lý các l?p h?c hi?u qu?"
        },
        {
            icon: Users,
            title: "Ði?m danh Thông minh",
            description: "H? th?ng di?m danh t? d?ng b?ng mã QR"
        },
        {
            icon: Calendar,
            title: "L?ch trình & Thi c?",
            description: "Qu?n lý l?ch h?c và l?ch thi m?t cách khoa h?c"
        },
        {
            icon: Award,
            title: "Báo cáo Hi?u su?t",
            description: "Phân tích và báo cáo k?t qu? h?c t?p chi ti?t"
        }
    ];

    return (
        <div className="home-container">
            {/* Navigation */}
            <nav className="home-navbar">
                <div className="navbar-brand">
                    <GraduationCap size={32} className="brand-icon" />
                    <span className="brand-text">S-Attendance</span>
                </div>
                <div className="navbar-links">
                    <a href="#features" className="nav-link">Tính nang</a>
                    <a href="#about" className="nav-link">V? chúng tôi</a>
                    <a href="#contact" className="nav-link">Liên h?</a>
                </div>
                <div className="navbar-actions">
                    <button onClick={handleLoginClick} className="btn btn-primary">
                        Ðang nh?p
                        <ArrowRight size={16} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            H? th?ng Qu?n lý
                            <span className="text-primary"> Tru?ng h?c</span>
                        </h1>
                        <p className="hero-description">
                            {loremText}
                        </p>
                        <div className="hero-actions">
                            <button onClick={handleLoginClick} className="btn btn-primary btn-large">
                                B?t d?u ngay
                                <ArrowRight size={18} />
                            </button>
                            <button className="btn btn-secondary btn-large">
                                Tìm hi?u thêm
                            </button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={bg} alt="School Management System" className="hero-img" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Tính nang N?i b?t</h2>
                        <p className="section-description">
                            Gi?i pháp toàn di?n cho vi?c qu?n lý giáo d?c hi?n d?i
                        </p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">10,000+</div>
                            <div className="stat-label">H?c sinh</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Giáo viên</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">100+</div>
                            <div className="stat-label">Tru?ng h?c</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">99.9%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">V? chúng tôi</h2>
                        <p className="section-description">
                            S-Attendance là gi?i pháp qu?n lý tru?ng h?c hàng d?u
                        </p>
                    </div>
                    <div className="about-content">
                        <div className="about-text">
                            <p>
                                V?i nhi?u nam kinh nghi?m trong linh v?c giáo d?c, chúng tôi cam k?t mang d?n 
                                nh?ng gi?i pháp công ngh? tiên ti?n giúp t?i uu hóa vi?c qu?n lý tru?ng h?c, 
                                nâng cao ch?t lu?ng giáo d?c và t?o ra môi tru?ng h?c t?p hi?u qu?.
                            </p>
                            <p>
                                S-Attendance du?c phát tri?n b?i d?i ngu chuyên gia giàu kinh nghi?m, 
                                luôn l?ng nghe và dáp ?ng nhu c?u c?a các tru?ng h?c hi?n d?i.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Liên h?</h2>
                        <p className="section-description">
                            Hãy liên h? v?i chúng tôi d? du?c tu v?n và h? tr?
                        </p>
                    </div>
                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="contact-item">
                                <h4>Ð?a ch?</h4>
                                <p>123 Ðu?ng Giáo d?c, Qu?n 1, TP.HCM</p>
                            </div>
                            <div className="contact-item">
                                <h4>Email</h4>
                                <p>info@s-attendance.edu.vn</p>
                            </div>
                            <div className="contact-item">
                                <h4>Ði?n tho?i</h4>
                                <p>(028) 1234 5678</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="brand">
                                <GraduationCap size={24} />
                                <span>S-Attendance</span>
                            </div>
                            <p>H? th?ng qu?n lý tru?ng h?c thông minh</p>
                        </div>
                        <div className="footer-links">
                            <div className="link-group">
                                <h4>S?n ph?m</h4>
                                <a href="#">Tính nang</a>
                                <a href="#">B?ng giá</a>
                                <a href="#">Demo</a>
                            </div>
                            <div className="link-group">
                                <h4>H? tr?</h4>
                                <a href="#">Tài li?u</a>
                                <a href="#">Hu?ng d?n</a>
                                <a href="#">Liên h?</a>
                            </div>
                            <div className="link-group">
                                <h4>Pháp lý</h4>
                                <a href="#">Ði?u kho?n</a>
                                <a href="#">Chính sách</a>
                                <a href="#">B?o m?t</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 S-Attendance. T?t c? quy?n du?c b?o luu.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;