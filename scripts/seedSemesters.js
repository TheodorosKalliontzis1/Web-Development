const db = require('../db/database');

// Βρες όλες τις σχολές από τη βάση
const schools = db.prepare('SELECT id FROM schools').all();

// Προετοιμασμένη εντολή για εισαγωγή εξαμήνων
const insert = db.prepare('INSERT OR IGNORE INTO semesters (school_id, semester) VALUES (?, ?)');

// Για κάθε σχολή, εισήγαγε 10 εξάμηνα
schools.forEach((school) => {
  for (let i = 1; i <= 10; i++) {
    insert.run(school.id, i);
  }
});

console.log('✅ Εισήχθησαν 10 εξάμηνα για κάθε σχολή');
