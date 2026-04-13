// React component for viewing all students with delete and edit functionality
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewStudents({ onNavigate, onEdit }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/student/view');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      setMessage('Error fetching students: ' + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:3000/student/delete/${id}`);
        setMessage('Student deleted successfully!');
        fetchStudents();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting student: ' + error.message);
      }
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336',
    color: 'white'
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2196F3',
    color: 'white'
  };

  const navButtonStyle = {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  if (loading) {
    return <div style={containerStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>All Students</h2>
      <div style={{ marginBottom: '20px' }}>
        <button style={navButtonStyle} onClick={() => onNavigate('view')}>View Students</button>
        <button style={navButtonStyle} onClick={() => onNavigate('add')}>Add Student</button>
      </div>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      {students.length === 0 ? (
        <p>No students found. Add some students to get started!</p>
      ) : (
        students.map((student) => (
          <div key={student._id} style={cardStyle}>
            <h3>{student.name}</h3>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <div>
              <button
                style={editButtonStyle}
                onClick={() => onEdit(student)}
              >
                Edit
              </button>
              <button
                style={deleteButtonStyle}
                onClick={() => handleDelete(student._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewStudents;