const express = require('express');
const router = express.Router();
const db = require('../db/database');
const multer = require('multer');
const path = require('path');

router.get('/', (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  // Παίρνουμε σχολή χρήστη
  const userSchool = db.prepare(`
    SELECT school_id FROM usersBelongsToSchool WHERE user_id = ?
  `).get(user.id);

  if (!userSchool) {
    return res.status(403).send('Δεν έχεις επιλέξει σχολή');
  }

  // Παίρνουμε όλα τα μαθήματα της σχολής
  const allCourses = db.prepare(`
    SELECT * FROM courses WHERE school_id = ? ORDER BY semester_id, name
  `).all(userSchool.school_id);

  if (user.role === 'student') {
    // Μαθήματα που έχει επιλέξει ο φοιτητής
    const selectedCourses = db.prepare(`
      SELECT course_id FROM studentAttendsCourse WHERE user_id = ?
    `).all(user.id).map(r => r.course_id);

    const isEditing = req.query.edit === 'true';
    const hasSelectedCourses = selectedCourses.length > 0;

    return res.render('myCourses', {
      user,
      courses: allCourses,
      selectedCourses,
      hasSelectedCourses,
      isEditing,
      isStudent: true,
      isProfessor: false,
    });
  }
  else if (user.role === 'professor') {
    // Μαθήματα που διδάσκει ο καθηγητής
    const teachingCourses = db.prepare(`
      SELECT course_id FROM professorTeachesCourse WHERE user_id = ?
    `).all(user.id).map(r => r.course_id);

    const isEditing = req.query.edit === 'true';
    const hasSelectedCourses = teachingCourses.length > 0;

    return res.render('myCourses', {
      user,
      courses: allCourses,
      teachingCourses,
      hasSelectedCourses,
      isEditing,
      isStudent: false,
      isProfessor: true,
    });
  }
  else {
    return res.status(403).send('Μη επιτρεπτός ρόλος');
  }
});

// POST route για αποθήκευση μαθημάτων (student & professor)
router.post('/', (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  const userSchool = db.prepare(`
    SELECT school_id FROM usersBelongsToSchool WHERE user_id = ?
  `).get(user.id);

  if (!userSchool) {
    return res.status(403).send('Δεν έχεις επιλέξει σχολή');
  }

  if (user.role === 'student') {
    let selectedCourseIds = req.body.courses;
    if (!Array.isArray(selectedCourseIds)) {
      selectedCourseIds = selectedCourseIds ? [selectedCourseIds] : [];
    }

    // Διαγραφή παλιών επιλογών
    db.prepare(`DELETE FROM studentAttendsCourse WHERE user_id = ?`).run(user.id);

    // Εισαγωγή νέων επιλογών
    const insert = db.prepare(`
      INSERT INTO studentAttendsCourse (user_id, course_id) VALUES (?, ?)
    `);
    const insertMany = db.transaction((ids) => {
      for (const courseId of ids) {
        insert.run(user.id, courseId);
      }
    });
    insertMany(selectedCourseIds);

    return res.redirect('/myCourses');
  }
  else if (user.role === 'professor') {
    let teachingCourseIds = req.body.teachingCourses;
    if (!Array.isArray(teachingCourseIds)) {
      teachingCourseIds = teachingCourseIds ? [teachingCourseIds] : [];
    }

    // Διαγραφή παλιών επιλογών
    db.prepare(`DELETE FROM professorTeachesCourse WHERE user_id = ?`).run(user.id);

    // Εισαγωγή νέων επιλογών
    const insert = db.prepare(`
      INSERT INTO professorTeachesCourse (user_id, course_id) VALUES (?, ?)
    `);
    const insertMany = db.transaction((ids) => {
      for (const courseId of ids) {
        insert.run(user.id, courseId);
      }
    });
    insertMany(teachingCourseIds);

    return res.redirect('/myCourses');
  }
  else {
    return res.status(403).send('Μη επιτρεπτός ρόλος');
  }
});

// GET /courses_details/:courseId - Εμφάνιση λεπτομερειών μαθήματος με ανακοινώσεις & πόρους
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

// POST /courses_details/:courseId/announcements - Προσθήκη ανακοίνωσης (μόνο καθηγητές που διδάσκουν το μάθημα)
router.post('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const user = req.session.user;

  if (!user || user.role !== 'professor') {
    return res.status(403).send('Μόνο καθηγητές μπορούν να προσθέτουν ανακοινώσεις.');
  }

  // Έλεγχος αν ο καθηγητής διδάσκει το μάθημα
  const teaches = db.prepare(`
    SELECT 1 FROM professorTeachesCourse WHERE user_id = ? AND course_id = ?
  `).get(user.id, courseId);

  if (!teaches) {
    return res.status(403).send('Δεν διδάσκετε αυτό το μάθημα.');
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Τίτλος και περιεχόμενο είναι υποχρεωτικά.');
  }

  try {
    db.prepare(`
      INSERT INTO announcements (title, content, course_id, user_id, created_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(title, content, courseId, user.id);
    console.log('Ανακοίνωση προστέθηκε επιτυχώς:', title);

    res.redirect(`/myCourses/${courseId}`);


  } catch (err) {
    console.error('Σφάλμα στην εισαγωγή ανακοίνωσης:', err);
    res.status(500).send('Σφάλμα στην προσθήκη ανακοίνωσης.');
  }
});

// Αποθήκευση αρχείων σε φάκελο /uploads με μοναδικό όνομα
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });  // <--- χρησιμοποιούμε το storage

/**
 * POST /courses_details/:courseId/resources
 * Μόνο για καθηγητές που διδάσκουν το μάθημα
 */
router.post('/:courseId/resources', upload.single('resourceFile'), (req, res) => {
  const courseId = req.params.courseId;
  const user = req.session.user;

  if (!user || user.role !== 'professor') {
    return res.status(403).send('Μόνο καθηγητές μπορούν να ανεβάζουν αρχεία.');
  }

  const teaches = db.prepare(`
    SELECT 1 FROM professorTeachesCourse WHERE user_id = ? AND course_id = ?
  `).get(user.id, courseId);

  if (!teaches) {
    return res.status(403).send('Δεν διδάσκετε αυτό το μάθημα.');
  }

  const { title } = req.body;
  const file = req.file;

  if (!title || !file) {
    return res.status(400).send('Ο τίτλος και το αρχείο είναι υποχρεωτικά.');
  }

  try {
    db.prepare(`
      INSERT INTO resources (title, file_path, original_name, course_id, uploaded_by, uploaded_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      title,
      file.filename,       // το όνομα του αρχείου στον φάκελο uploads
      file.originalname,   // το αυθεντικό όνομα που είχε το αρχείο
      courseId,
      user.id
    );

    console.log('Αρχείο προστέθηκε επιτυχώς:', title);
    res.redirect(`/myCourses/${courseId}`);
  } catch (err) {
    console.error('Σφάλμα στην αποθήκευση αρχείου:', err);
    res.status(500).send('Σφάλμα στην προσθήκη σημειώσεων.');
  }
});



module.exports = router;
