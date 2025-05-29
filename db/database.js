const Database = require('better-sqlite3');
const db = new Database('db/SmartClass.db');

// Initialize tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    surname TEXT NOT NULL,
    student_id TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT  NOT NULL
);

CREATE TABLE IF NOT EXISTS schools (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT NOT NULL
  
);

CREATE TABLE IF NOT EXISTS semesters (
  id INTEGER PRIMARY KEY,
  school_id INTEGER,
  semester INTEGER,
  UNIQUE(school_id, semester),
  FOREIGN KEY (school_id) REFERENCES schools(id)
);
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  school_id INTEGER,
  semester_id INTEGER,
  description TEXT,
  FOREIGN KEY (school_id) REFERENCES schools(id),
  FOREIGN KEY (semester_id) REFERENCES semesters(id)
);

CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  course_id INTEGER,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id INTEGER,
    student_id INTEGER,
    grade REAL CHECK(grade >= 0 AND grade <= 10),
    feedback TEXT,
    FOREIGN KEY(assignment_id) REFERENCES assignments(id),
    FOREIGN KEY(student_id) REFERENCES users(id)
);



CREATE TABLE IF NOT EXISTS usersBelongsToSchool (
  user_id INTEGER NOT NULL,
  school_id INTEGER NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (school_id) REFERENCES schools(id)
);

CREATE TABLE IF NOT EXISTS studentAttendsCourse (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  UNIQUE(user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS professorTeachesCourse (
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  course_id INTEGER NOT NULL,
  uploaded_by INTEGER NOT NULL,
  original_name TEXT NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);



`);



module.exports = db;
