const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const db = require('../db/database');

// GET /courses
router.get('/', (req, res) => {
  const schoolId = req.query.schoolId;
  const selectedSemesterId = req.query.semester;

  const schools = db.prepare(`
    SELECT s.*, 
      (SELECT COUNT(*) FROM courses c WHERE c.school_id = s.id) AS coursesAvailable
    FROM schools s
  `).all();

  let selectedSchool = null;
  let semesters = [];
  let courses = [];
  let selectedSemesterLabel = null;
  let userSchoolId = null;
  let canViewDetails = false;

  // Έλεγχος αν υπάρχει συνδεδεμένος χρήστης
  if (req.session.user) {
    const userRole = req.session.user.role;

    if (userRole === 'admin') {
      canViewDetails = true; // Admin βλέπει τα πάντα
    } else {
      // Βρες σε ποια σχολή ανήκει ο χρήστης
      const userSchool = db.prepare(`
        SELECT school_id FROM usersBelongsToSchool WHERE user_id = ?
      `).get(req.session.user.id);
      
      if (userSchool) {
        userSchoolId = userSchool.school_id;
        canViewDetails = true;  // Ο χρήστης βλέπει λεπτομέρειες μόνο αν ανήκει σε σχολή
      }
    }
  }

  if (schoolId) {
    selectedSchool = db.prepare(`SELECT * FROM schools WHERE id = ?`).get(schoolId);

    semesters = db.prepare(`
      SELECT sem.id, sem.semester,
      (SELECT COUNT(*) FROM courses c WHERE c.semester_id = sem.semester AND c.school_id = ?) AS course_count
      FROM semesters sem
      WHERE sem.school_id = ?
      ORDER BY sem.semester
    `).all(schoolId, schoolId);

    if (selectedSemesterId) {
      const sem = db.prepare(`SELECT semester FROM semesters WHERE id = ?`).get(selectedSemesterId);
      selectedSemesterLabel = sem?.semester;

      courses = db.prepare(`
        SELECT c.*, c.semester_id
        FROM courses c WHERE c.school_id = ? AND c.semester_id = ?
      `).all(schoolId, selectedSemesterLabel);
    }
  }

  res.render('courses', {
    schools,
    selectedSchool,
    semesters,
    courses,
    selectedSemester: selectedSemesterId,
    user: req.session.user,
    isAdmin: req.session.user?.role === 'admin',
    userSchoolId,
    canViewDetails
  });
});

// POST /courses/add
router.post('/add', (req, res) => {
  const { name, description, semester_id, school_id } = req.body;

  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Απαγορεύεται');
  }

  try {
    Course.addCourse({ name, description, semester_id, school_id });
    res.redirect(`/courses?schoolId=${school_id}&semester=${semester_id}`);
  } catch (err) {
    console.error('Σφάλμα στην προσθήκη μαθήματος:', err);
    res.status(500).send('Σφάλμα προσθήκης');
  }
});
router.get('/:courseId', (req, res) => {
  const courseId = req.params.courseId;

  // Φόρτωσε το μάθημα
  const course = db.prepare(`
    SELECT c.*, s.semester AS semester_number, sch.name AS school_name
    FROM courses c
    JOIN semesters s ON c.semester_id = s.id
    JOIN schools sch ON c.school_id = sch.id
    WHERE c.id = ?
  `).get(courseId);

  if (!course) {
    return res.status(404).send('Το μάθημα δεν βρέθηκε');
  }

  const user = req.session.user;
  let canViewDetails = false;
  let isProfessor = false;
  let teachesThisCourse = false;

  if (user) {
    if (user.role === 'admin') {
      canViewDetails = true;
    } else {
      const userSchool = db.prepare(`SELECT school_id FROM usersBelongsToSchool WHERE user_id = ?`).get(user.id);

      if (userSchool && userSchool.school_id === course.school_id) {
        canViewDetails = true;
      }

      if (user.role === 'professor') {
        isProfessor = true;

        const teaching = db.prepare(`
          SELECT 1 FROM professorTeachesCourse
          WHERE user_id = ? AND course_id = ?
        `).get(user.id, courseId);

        teachesThisCourse = !!teaching;
      }
    }
  }

  if (!canViewDetails) {
    return res.status(403).send('Δεν έχετε δικαίωμα να δείτε αυτό το μάθημα.');
  }

  // Φόρτωσε τις ανακοινώσεις μαζί με το όνομα καθηγητή (username + surname)
  const announcements = db.prepare(`
    SELECT a.*, u.username || ' ' || u.surname AS professor_name
    FROM announcements a
    JOIN users u ON a.user_id = u.id
    WHERE a.course_id = ?
    ORDER BY a.created_at DESC
  `).all(courseId);

  // Φόρτωσε τους πόρους (αν έχεις)
  const resources = db.prepare(`
    SELECT * FROM resources WHERE course_id = ?
  `).all(courseId);

  res.render('course_details', {
    course,
    announcements,
    resources,
    user,
    isAdmin: user?.role === 'admin',
    isProfessor,
    teachesThisCourse
  });
  //res.redirect(`/courses_details/${courseId}`);
});




module.exports = router;

