// React component for editing an existing student with pre-filled form data
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditStudent({ student, onNavigate, onUpdateComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        course: student.course || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student || !student._id) {
      setMessage('Invalid student data');
      return;
    }
    try {
      await axios.put(`http://localhost:3000/student/update/${student._id}`, formData);
      setMessage('Student updated successfully!');
      setTimeout(() => {
        setMessage('');
        if (onUpdateComplete) {
          onUpdateComplete();
        }
      }, 2000);
    } catch (error) {
      setMessage('Error updating student: ' + (error.response?.data?.message || error.message));
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  const buttonStyle = {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const navButtonStyle = {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '14px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  if (!student) {
    return (
      <div style={containerStyle}>
        <h2>Edit Student</h2>
        <p>No student selected for editing.</p>
        <button style={navButtonStyle} onClick={() => onNavigate('view')}>Back to View</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>Edit Student</h2>
      <div style={{ marginBottom: '20px' }}>
        <button style={navButtonStyle} onClick={() => onNavigate('view')}>View Students</button>
        <button style={navButtonStyle} onClick={() => onNavigate('add')}>Add Student</button>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={formData.course}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Update Student</button>
      </form>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green', marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default EditStudent;