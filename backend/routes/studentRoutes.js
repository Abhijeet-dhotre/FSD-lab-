// Express router with REST API routes for CRUD operations on students
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST - Add a new student
router.post('/add', async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const newStudent = new Student({ name, email, course });
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', student: savedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
});

// GET - View all students
router.get('/view', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

// PUT - Update a student by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, course },
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
});

// DELETE - Delete a student by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully', student: deletedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
});

module.exports = router;