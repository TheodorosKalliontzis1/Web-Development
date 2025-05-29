const db = require('../db/database');

// Σχολές προς εισαγωγή
const schoolData = [
  { name: "Ιατρική Σχολή", acronym: "MED" },
  { name: "Σχολή Ηλεκτρολόγων Μηχανικών", acronym: "ECE" },
  { name: "Σχολή Πληροφορικής", acronym: "CS" },
  { name: "Σχολή Πολιτικών Μηχανικών", acronym: "CE" },
  { name: "Σχολή Μηχανολόγων Μηχανικών", acronym: "ME" },
  { name: "Σχολή Οικονομικών Επιστημών", acronym: "ECO" },
  {name: "Σχολή Νομικής", acronym: "LAW" }
];

function seedSchools() {
  const insert = db.prepare('INSERT OR IGNORE INTO schools (id, name, acronym) VALUES (?, ?, ?)');
  schoolData.forEach((school, index) => {
    insert.run(index + 1, school.name, school.acronym); // δίνουμε ID χειροκίνητα για σιγουριά
  });
  console.log('✅ Οι σχολές μπήκαν ή υπήρχαν ήδη.');
}

module.exports = seedSchools;
