const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/userController');
const db = require('../db/database');
const { use } = require('react');


// Αρχική σελίδα
router.get("/", (req, res) => {
  console.log("Session user:", req.session.user); // <- Εδώ θα δεις στο terminal
  res.render("main", { users: req.session.user });
});

// Σελίδα Εγγραφής
router.get('/register', (req, res) => {
  res.render('register', { title: 'Εγγραφή' });
});
// Σελίδα Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Σύνδεση' });
});
//Σελίδα About us 
router.get('/about_us', (req, res) => {
  res.render('about_us', { title: 'Σχετικά με εμάς' });
});

// Σελίδα Μαθημάτων
router.get('/courses', (req, res) => {
  res.render('courses', { title: 'Μαθήματα' });
});
// Σελίδα myCourses
router.get('/myCourses', (req, res) => {
  res.render('myCourses', { title: 'Τα Μαθήματά μου' });
}
);

// Σελίδα Σχετικά με εμάς
router.get('/about', (req, res) => {
  res.render('Aboutus', { title: 'Σχετικά με εμάς' });
});
// GET: εμφάνιση φόρμας επιλογής σχολής
router.get('/select-school', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const schools = db.prepare('SELECT * FROM schools').all();

  res.render('select-school', {
    schools,
    user: req.session.user,
  });
});



// POST: καταχώρηση επιλογής σχολής
router.post('/select-school', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const schoolId = req.body.school_id;

  try {
    db.prepare(`
      INSERT OR REPLACE INTO usersBelongsToSchool (user_id, school_id)
      VALUES (?, ?)
    `).run(req.session.user.id, schoolId);

    res.redirect('/');
  } catch (err) {
    console.error('Σφάλμα εισαγωγής σχολής για χρήστη:', err);
    res.status(500).send('Σφάλμα αποθήκευσης');
  }
});



router.get('/logout', userController.logout);


// User authentication routes
router.post('/register', userController.signup);

router.post('/login', userController.login);


// Route για άγνωστες διαδρομές (404)
router.use((req, res) => {
  res.status(404).render('error', { title: 'Σφάλμα', message: 'Η σελίδα δεν βρέθηκε.' });
});


module.exports = router;

