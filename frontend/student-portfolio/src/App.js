import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:3000/student';

const AVATAR_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316',
  '#eab308', '#22c55e', '#14b8a6', '#0ea5e9', '#3b82f6'
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/view`);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      showToast('Error fetching students', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddStudent = async (formData) => {
    try {
      await axios.post(`${API_BASE}/add`, formData);
      showToast('Student added successfully ✓', 'success');
      fetchStudents();
      setShowModal(false);
    } catch (error) {
      showToast('Error adding student', 'error');
    }
  };

  const handleUpdateStudent = async (id, formData) => {
    try {
      await axios.put(`${API_BASE}/update/${id}`, formData);
      showToast('Student updated successfully ✓', 'success');
      fetchStudents();
      setShowModal(false);
      setEditingStudent(null);
    } catch (error) {
      showToast('Error updating student', 'error');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_BASE}/delete/${id}`);
        showToast('Student deleted successfully ✓', 'success');
        fetchStudents();
      } catch (error) {
        showToast('Error deleting student', 'error');
      }
    }
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  return (
    <div className="app">
      <Navbar onAddStudent={openAddModal} />
      
      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : students.length === 0 ? (
          <EmptyState onAddStudent={openAddModal} />
        ) : (
          <StudentGrid 
            students={students} 
            onEdit={openEditModal}
            onDelete={handleDeleteStudent}
          />
        )}
      </main>

      {showModal && (
        <Modal
          student={editingStudent}
          onClose={closeModal}
          onSubmit={editingStudent 
            ? (form) => handleUpdateStudent(editingStudent._id, form)
            : handleAddStudent
          }
        />
      )}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

function Navbar({ onAddStudent }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <span className="navbar-title">Student Management</span>
      </div>
      <div className="navbar-right">
        <button className="btn btn-primary" onClick={onAddStudent}>
          <span className="btn-icon">+</span>
          Add Student
        </button>
      </div>
    </nav>
  );
}

function StudentGrid({ students, onEdit, onDelete }) {
  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="student-card">
      <div className="student-card-header">
        <div 
          className="avatar" 
          style={{ backgroundColor: getAvatarColor(student.name) }}
        >
          {getInitials(student.name)}
        </div>
        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>
          <p className="student-email">{student.email}</p>
        </div>
      </div>
      <div className="student-course">
        <span className="course-pill">{student.course}</span>
      </div>
      <div className="student-card-actions">
        <button 
          className="btn btn-outline-gray" 
          onClick={() => onEdit(student)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
        <button 
          className="btn btn-outline-red" 
          onClick={() => onDelete(student._id)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onAddStudent }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🎓</div>
      <h2 className="empty-state-title">No students yet</h2>
      <p className="empty-state-text">Add your first student to get started</p>
      <button className="btn btn-primary" onClick={onAddStudent}>
        Add Student
      </button>
    </div>
  );
}

function Modal({ student, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    course: student?.course || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter course name"
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-text-gray" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;