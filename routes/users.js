const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body;
    const user = User.create(req.body);
    console.log('New user created:', user);
    res.status(201).send(user);
});

// Get all users
router.get('/', (req, res) => {
    const users = User.findAll();
    res.send(users);
});
// routes/courses.js
router.get('/:id', (req, res) => {
  const user = req.session.user;

  const courseId = req.params.id;

  const course = db.prepare(`
    SELECT c.*, s.name AS school_name, sem.semester AS semester_number
    FROM courses c
    JOIN schools s ON c.school_id = s.id
    JOIN semesters sem ON c.semester_id = sem.id
    WHERE c.id = ?
  `).get(courseId);

  if (!course) return res.status(404).send("Μάθημα δεν βρέθηκε.");

  const isAdmin = user?.role === 'admin';

  // Έλεγχος αν ο χρήστης ανήκει στη σχολή του μαθήματος
  let isAuthorized = false;

  if (user && !isAdmin) {
    const userSchool = db.prepare(`
      SELECT school_id FROM usersBelongsToSchool WHERE user_id = ?
    `).get(user.id);

    if (userSchool && userSchool.school_id === course.school_id) {
      isAuthorized = true;
    }
  }

  if (!isAdmin && !isAuthorized) {
    return res.status(403).send("Δεν έχετε πρόσβαση σε αυτό το μάθημα.");
  }

  const announcements = db.prepare(`
    SELECT * FROM announcements
    WHERE course_id = ?
    ORDER BY date DESC
  `).all(courseId);

  const resources = db.prepare(`
    SELECT * FROM resources
    WHERE course_id = ?
  `).all(courseId);

  res.render('course_details', {
    course,
    announcements,
    resources,
    user
  });
});




module.exports = router;
