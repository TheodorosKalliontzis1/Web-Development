-- 1. Εισαγωγή σχολής "Ηλεκτρολόγων Μηχανικών"
INSERT INTO schools (name)
SELECT 'Ηλεκτρολόγων Μηχανικών'
WHERE NOT EXISTS (
  SELECT 1 FROM schools WHERE name = 'Ηλεκτρολόγων Μηχανικών'
);

-- 2. Ανάκτηση του school_id
WITH selected_school AS (
  SELECT id AS school_id FROM schools WHERE name = 'Ηλεκτρολόγων Μηχανικών'
)

-- 3. Εισαγωγή εξαμήνων (αν δεν υπάρχουν ήδη για τη σχολή)
INSERT INTO semesters (school_id, semester)
SELECT s.school_id, sem
FROM selected_school s,
     (SELECT 1 AS sem UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
      UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8) AS semesters
WHERE NOT EXISTS (
  SELECT 1 FROM semesters sems WHERE sems.school_id = s.school_id AND sems.semester = semesters.sem
);

-- 4. Εισαγωγή μαθημάτων για το τμήμα
-- Υποθέτουμε ότι τα ids των εξαμήνων έχουν μπει με σειρά.

-- Ανακτούμε τα IDs των εξαμήνων για το συγκεκριμένο school_id
-- και τα αποθηκεύουμε προσωρινά σε μια προσωρινή δομή
WITH school AS (
  SELECT id AS school_id FROM schools WHERE name = 'Ηλεκτρολόγων Μηχανικών'
),
semesters AS (
  SELECT id, semester FROM semesters WHERE school_id = (SELECT school_id FROM school)
)
INSERT INTO courses (name, description, school_id, semester_id)
SELECT 'Ηλεκτρικά Κυκλώματα I',
       'Εισαγωγή στα ηλεκτρικά κυκλώματα, νόμοι του Kirchhoff, τεχνικές ανάλυσης.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 1)
UNION ALL
SELECT 'Προγραμματισμός Υπολογιστών',
       'Βασικές έννοιες προγραμματισμού με C/C++ για μηχανικούς.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 1)
UNION ALL
SELECT 'Γραμμικά Συστήματα',
       'Μελέτη γραμμικών διαφορικών εξισώσεων και συστημάτων.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 2)
UNION ALL
SELECT 'Ηλεκτρονική I',
       'Δίοδοι, τρανζίστορ, ενισχυτές.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 3)
UNION ALL
SELECT 'Συστήματα Ελέγχου',
       'Ανατροφοδότηση, μετασχηματισμός Laplace, σχεδίαση ελεγκτών.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 5)
UNION ALL
SELECT 'Ηλεκτρικές Μηχανές',
       'Μελέτη κινητήρων και γεννητριών συνεχούς και εναλλασσόμενου ρεύματος.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 6)
UNION ALL
SELECT 'Ενσωματωμένα Συστήματα',
       'Προγραμματισμός μικροελεγκτών και χρήση RTOS.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 7)
UNION ALL
SELECT 'Διπλωματική Εργασία',
       'Εκπόνηση διπλωματικής εργασίας στο τελευταίο εξάμηνο σπουδών.',
       (SELECT school_id FROM school),
       (SELECT id FROM semesters WHERE semester = 8);
