import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar,
  GraduationCap,
  CheckCircle,
  X,
  Search,
  Eye,
  ArrowRight,
  Users,
  Star,
  Send,
  HelpCircle,
  FileUp,
  AlignLeft
} from "lucide-react";
import { 
  getAssignmentsByTeacher, 
  createAssignment, 
  updateAssignment, 
  deleteAssignment 
} from "../../api/assignmentApi";
import { getClassesByTeacher } from "../../api/classApi";
import { BASE_URL } from "../../api/config";
import "./TeacherAssignments.css";

// Quiz Builder Component
const QuizBuilder = ({ questions, onChange, maxScore }) => {
  const addQuestion = () => {
    const timestamp = Date.now();
    const newQuestion = {
      id: `q_${timestamp}`,
      content: "",
      type: "SINGLE_CHOICE",
      options: [
        { id: `opt_${timestamp}_0`, content: "" },
        { id: `opt_${timestamp}_1`, content: "" },
        { id: `opt_${timestamp}_2`, content: "" },
        { id: `opt_${timestamp}_3`, content: "" }
      ],
      correctAnswers: [],
      points: 1
    };
    onChange([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    onChange(questions.filter((_, i) => i !== index));
  };

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0);

  // Sync total points with maxScore
  useEffect(() => {
    if (totalPoints > 0 && totalPoints !== maxScore) {
      onChange(questions, totalPoints);
    }
  }, [totalPoints, maxScore]);

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addOption = (questionIndex) => {
    const updated = [...questions];
    const question = { ...updated[questionIndex] };
    const timestamp = Date.now();
    question.options = [
      ...question.options,
      { id: `opt_${timestamp}_${question.options.length}`, content: "" }
    ];
    updated[questionIndex] = question;
    onChange(updated);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updated = [...questions];
    const question = { ...updated[questionIndex] };
    question.options = question.options.filter((_, i) => i !== optionIndex);
    // Remove correct answer if it was this option
    question.correctAnswers = (question.correctAnswers || [])
      .filter(ca => ca !== optionIndex)
      .map(ca => ca > optionIndex ? ca - 1 : ca);
    updated[questionIndex] = question;
    onChange(updated);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updated = [...questions];
    const question = { ...updated[questionIndex] };
    const options = [...question.options];
    options[optionIndex] = { ...options[optionIndex], content: value };
    question.options = options;
    updated[questionIndex] = question;
    onChange(updated);
  };

  const toggleCorrectAnswer = (questionIndex, optionIndex) => {
    const updated = [...questions];
    const question = { ...updated[questionIndex] };
    
    if (question.type === "SINGLE_CHOICE") {
      question.correctAnswers = [optionIndex];
    } else {
      const current = question.correctAnswers || [];
      const index = current.indexOf(optionIndex);
      if (index > -1) {
        question.correctAnswers = current.filter(ca => ca !== optionIndex);
      } else {
        question.correctAnswers = [...current, optionIndex];
      }
    }
    updated[questionIndex] = question;
    onChange(updated);
  };

  return (
    <div className="quiz-builder">
      <div className="quiz-header">
        <span className="quiz-stats">{questions.length} câu h?i | T?ng di?m: {totalPoints}/{maxScore}</span>
        <button type="button" className="add-question-btn" onClick={addQuestion}>
          <Plus size={16} />
          Thêm câu h?i
        </button>
      </div>
      
      {questions.map((question, qIndex) => (
        <div key={question.id} className="question-card">
          <div className="question-header">
            <span className="question-number">Câu {qIndex + 1}</span>
            <button type="button" className="remove-btn" onClick={() => removeQuestion(qIndex)}>
              <Trash2 size={14} />
            </button>
          </div>
          
          <input
            type="text"
            className="question-input"
            placeholder="Nh?p câu h?i..."
            value={question.content}
            onChange={(e) => updateQuestion(qIndex, 'content', e.target.value)}
          />
          
          <div className="question-type">
            <label>Lo?i:</label>
            <select
              value={question.type}
              onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
            >
              <option value="SINGLE_CHOICE">Ch?n 1 dáp án</option>
              <option value="MULTIPLE_CHOICE">Ch?n nhi?u dáp án</option>
            </select>
            <input
              type="number"
              className="points-input"
              placeholder="Ði?m"
              value={question.points}
              onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value) || 1)}
              min="1"
            />
          </div>
          
          <div className="options-list">
            {question.options.map((option, oIndex) => (
              <div key={option.id} className="option-row">
                <input
                  type={question.type === "SINGLE_CHOICE" ? "radio" : "checkbox"}
                  name={`correct_${qIndex}`}
                  checked={question.correctAnswers.includes(oIndex)}
                  onChange={() => toggleCorrectAnswer(qIndex, oIndex)}
                  className="correct-checkbox"
                />
                <input
                  type="text"
                  placeholder={`Ðáp án ${oIndex + 1}`}
                  value={option.content}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  className="option-input"
                />
                <button type="button" className="remove-option-btn" onClick={() => removeOption(qIndex, oIndex)}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          
          <button type="button" className="add-option-btn" onClick={() => addOption(qIndex)}>
            <Plus size={14} />
            Thêm dáp án
          </button>
        </div>
      ))}
      
      {questions.length === 0 && (
        <div className="empty-questions">
          <HelpCircle size={32} />
          <p>Chua có câu h?i nào</p>
          <button type="button" className="add-question-btn" onClick={addQuestion}>
            <Plus size={16} />
            Thêm câu h?i d?u tiên
          </button>
        </div>
      )}
    </div>
  );
};
const TeacherAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    selectedClasses: [],
    maxScore: 10,
    type: "ESSAY",
    questions: []
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const teacherId = user.teacherId || user.userId;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!teacherId) {
        console.error("Teacher ID is missing from localStorage");
        setError("Không tìm th?y thông tin giáo viên. Vui lòng dang nh?p l?i.");
        setLoading(false);
        return;
      }
      
      console.log("Fetching assignments for teacher:", teacherId);
      const [assignmentsData, classesData] = await Promise.all([
        getAssignmentsByTeacher(teacherId),
        getClassesByTeacher(teacherId)
      ]);
      console.log("Assignments loaded:", assignmentsData);
      console.log("Classes loaded:", classesData);
      setAssignments(assignmentsData || []);
      setClasses(classesData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Không th? t?i d? li?u: " + (err.message || "L?i không xác d?nh"));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (formData.selectedClasses.length === 0) {
      alert("Vui lòng ch?n ít nh?t m?t l?p!");
      return;
    }
    try {
      const selectedClassObjects = classes.filter(c => 
        formData.selectedClasses.includes(c.id)
      );
      const assignmentData = {
        ...formData,
        classes: selectedClassObjects,
        teacherId,
        submittedCount: 0,
        totalCount: selectedClassObjects.reduce((sum, c) => sum + (c.studentCount || 30), 0)
      };
      await createAssignment(assignmentData);
      setShowCreateModal(false);
      resetForm();
      alert("Bài t?p dã du?c t?o và g?i d?n các l?p dã ch?n!");
      fetchData();
    } catch (err) {
      console.error("Error creating assignment:", err);
      alert("Không th? t?o bài t?p. Vui lòng th? l?i.");
    }
  };

  const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    try {
      const selectedClassObjects = classes.filter(c => 
        formData.selectedClasses.includes(c.id)
      );
      const assignmentData = {
        ...formData,
        classes: selectedClassObjects
      };
      await updateAssignment(editingAssignment.id, assignmentData);
      setEditingAssignment(null);
      setShowCreateModal(false);
      resetForm();
      alert("Bài t?p dã du?c c?p nh?t!");
      fetchData();
    } catch (err) {
      console.error("Error updating assignment:", err);
      alert("Không th? c?p nh?t bài t?p. Vui lòng th? l?i.");
    }
  };

  const handleDeleteAssignment = async (id) => {
    if (window.confirm("B?n có ch?c mu?n xóa bài t?p này?")) {
      try {
        await deleteAssignment(id);
        alert("Ðã xóa bài t?p!");
        fetchData();
      } catch (err) {
        console.error("Error deleting assignment:", err);
        alert("Không th? xóa bài t?p. Vui lòng th? l?i.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      deadline: "",
      selectedClasses: [],
      maxScore: 10,
      type: "ESSAY",
      questions: []
    });
  };

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title || '',
      description: assignment.description || '',
      deadline: assignment.deadline || '',
      selectedClasses: (assignment.classes || []).map(c => c.id || c),
      maxScore: assignment.maxScore || 10,
      type: assignment.type || 'ESSAY',
      questions: assignment.questions || []
    });
    setShowCreateModal(true);
  };

  const toggleClassSelection = (classId) => {
    setFormData(prev => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classId)
        ? prev.selectedClasses.filter(id => id !== classId)
        : [...prev.selectedClasses, classId]
    }));
  };

  const filteredAssignments = assignments.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (submitted, total) => {
    const percentage = (submitted / total) * 100;
    if (percentage >= 80) return "success";
    if (percentage >= 50) return "warning";
    return "danger";
  };

  if (loading) {
    return (
      <div className="teacher-assignments-container">
        <div className="page-header">
          <h1 className="page-title">
            <FileText size={28} />
            Qu?n lý bài t?p
          </h1>
        </div>
        <div className="loading-state">Ðang t?i d? li?u...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="teacher-assignments-container">
        <div className="page-header">
          <h1 className="page-title">
            <FileText size={28} />
            Qu?n lý bài t?p
          </h1>
        </div>
        <div className="error-state">{error}</div>
      </div>
    );
  }

  return (
    <div className="teacher-assignments-container">
      
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText size={28} />
            Qu?n lý bài t?p
          </h1>
          <p className="page-subtitle">T?o và g?i bài t?p d?n các l?p</p>
        </div>
        <button 
          className="create-btn"
          style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' }}
          onClick={() => {
            setEditingAssignment(null);
            resetForm();
            setShowCreateModal(true);
          }}
        >
          <Plus size={20} />
          T?o bài t?p m?i
        </button>
      </div>

      <div className="search-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Tìm ki?m bài t?p..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="assignments-list">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-header">
              <div className="assignment-info">
                <h3 className="assignment-title">{assignment.title}</h3>
                <p className="assignment-desc">{assignment.description}</p>
                <div className="assignment-stats-inline">
                  <span className={`status-pill ${getStatusColor(assignment.submittedCount, assignment.totalCount || 30)}`}>
                    Ðã n?p: {assignment.submittedCount || 0}/{assignment.totalCount || 30}
                  </span>
                </div>
              </div>
              <div className="assignment-actions">
                <button 
                  className="action-btn view"
                  onClick={() => navigate(`/teacher/assignments/${assignment.id}/submissions`)}
                  title="Xem bài n?p"
                >
                  <Eye size={16} />
                </button>
                <button 
                  className="action-btn edit"
                  onClick={() => openEditModal(assignment)}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteAssignment(assignment.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="assignment-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>H?n n?p: {assignment.deadline}</span>
              </div>
              <div className="meta-item">
                <GraduationCap size={16} />
                <span>Ði?m t?i da: {assignment.maxScore}</span>
              </div>
            </div>

            <div className="assignment-classes">
              <span className="label">G?i d?n:</span>
              <div className="class-tags">
                {(assignment.classes || []).map(c => (
                  <span key={c.id || c} className="class-tag">{c.name || c}</span>
                ))}
              </div>
            </div>

            <div className={`assignment-status ${getStatusColor(assignment.submittedCount || 0, assignment.totalCount || 1)}`}>
              <CheckCircle size={16} />
              <span>{assignment.submittedCount || 0}/{assignment.totalCount || 0} sinh viên dã n?p</span>
            </div>
          </div>
        ))}

        {filteredAssignments.length === 0 && (
          <div className="empty-state">
            <FileText size={48} />
            <p>Chua có bài t?p nào</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingAssignment ? "Ch?nh s?a bài t?p" : "T?o bài t?p m?i"}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingAssignment(null);
                  resetForm();
                }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={editingAssignment ? handleUpdateAssignment : handleCreateAssignment}>
              <div className="form-group">
                <label>Tiêu d? bài t?p *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Nh?p tiêu d? bài t?p"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô t? *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Mô t? chi ti?t bài t?p"
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>H?n n?p *</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ði?m t?i da *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.maxScore}
                    onChange={(e) => setFormData({...formData, maxScore: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>

              {/* Assignment Type */}
              <div className="form-group">
                <label>Lo?i bài t?p *</label>
                <div className="type-selection">
                  <button
                    type="button"
                    className={`type-btn ${formData.type === 'ESSAY' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, type: 'ESSAY'})}
                  >
                    <AlignLeft size={16} />
                    T? lu?n
                  </button>
                  <button
                    type="button"
                    className={`type-btn ${formData.type === 'QUIZ' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, type: 'QUIZ'})}
                  >
                    <HelpCircle size={16} />
                    Tr?c nghi?m
                  </button>
                  <button
                    type="button"
                    className={`type-btn ${formData.type === 'UPLOAD' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, type: 'UPLOAD'})}
                  >
                    <FileUp size={16} />
                    Upload file
                  </button>
                </div>
              </div>

              {/* Quiz Builder - Only show when type is QUIZ */}
              {formData.type === 'QUIZ' && (
                <div className="form-group">
                  <label>Câu h?i tr?c nghi?m</label>
                  <QuizBuilder 
                    questions={formData.questions}
                    maxScore={formData.maxScore}
                    onChange={(questions, newMaxScore) => {
                      setFormData(prev => {
                        const next = { ...prev, questions };
                        if (newMaxScore !== undefined) {
                          next.maxScore = newMaxScore;
                        }
                        return next;
                      });
                    }}
                  />
                </div>
              )}

              {/* Upload Section - For UPLOAD type assignment */}
              {formData.type === 'UPLOAD' && (
                <div className="form-group">
                  <label>Tài li?u dính kèm (cho sinh viên) </label>
                  <div 
                    className="upload-area" 
                    onClick={() => document.getElementById('assignment-file-upload').click()}
                    style={{
                      border: '2px dashed #ddd',
                      borderRadius: '12px',
                      padding: '30px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: '#f9fafb',
                      marginBottom: '15px'
                    }}
                  >
                    <input
                      id="assignment-file-upload"
                      type="file"
                      multiple
                      onChange={async (e) => {
                        const files = Array.from(e.target.files);
                        for (const file of files) {
                          try {
                            const uploadFormData = new FormData();
                            uploadFormData.append('file', file);
                            
                            // Using the same endpoint as Students
                            const response = await fetch(`${BASE_URL}/api/v1/files/upload`, {
                              method: 'POST',
                              body: uploadFormData
                            });
                            
                            const result = await response.json();
                            
                            if (result.success) {
                              setFormData(prev => ({
                                ...prev,
                                attachments: [
                                  ...(prev.attachments || []),
                                  {
                                    fileName: result.fileName,
                                    name: result.originalFileName,
                                    fileUrl: result.fileUrl,
                                    fileType: result.fileType,
                                    fileSize: file.size
                                  }
                                ]
                              }));
                            } else {
                              alert('Failed to upload file: ' + result.message);
                            }
                          } catch (error) {
                            console.error('Error uploading file:', error);
                            alert('Failed to upload file');
                          }
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <FileUp size={40} color="#0ea5e9" style={{ marginBottom: '10px' }} />
                    <p style={{ margin: 0, color: '#64748b' }}>Click d? ch?n tài li?u ho?c hu?ng d?n dính kèm</p>
                  </div>
                  
                  {formData.attachments && formData.attachments.length > 0 && (
                    <div className="attached-files" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {formData.attachments.map((file, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: '10px 15px',
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={18} color="#0ea5e9" />
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>{file.name || file.fileName}</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                attachments: prev.attachments.filter((_, i) => i !== idx)
                              }));
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Ch?n l?p g?i bài t?p *</label>
                <div className="class-selection">
                  {classes.map(c => (
                    <label key={c.id} className="class-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.selectedClasses.includes(c.id)}
                        onChange={() => toggleClassSelection(c.id)}
                      />
                      <span className="checkmark"></span>
                      <span className="class-name">{c.name}</span>
                    </label>
                  ))}
                </div>
                {formData.selectedClasses.length === 0 && (
                  <p className="error-text">Vui lòng ch?n ít nh?t m?t l?p</p>
                )}
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingAssignment(null);
                    resetForm();
                  }}
                >
                  H?y
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={formData.selectedClasses.length === 0}
                >
                  {editingAssignment ? "C?p nh?t" : "T?o bài t?p"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;
