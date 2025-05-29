const db = require('../db/database'); // Better-sqlite3 connection

function addCourse({ name, description, semester_id, school_id }) {
  const stmt = db.prepare(`
    INSERT INTO courses (name, description, semester_id, school_id)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(name, description, semester_id, school_id);
}

function getAllCourses() {
  return db.prepare(`SELECT * FROM courses`).all();
}

function getCoursesBySchool(school_id) {
  return db.prepare(`SELECT * FROM courses WHERE school_id = ?`).all(school_id);
}

module.exports = {
  addCourse,
  getAllCourses,
  getCoursesBySchool,
};
