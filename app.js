const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const bcrypt = require('bcrypt');


const siteRoutes = require('./routes/site-routes');

const coursesRoutes = require('./routes/courses');
const siteSession = require('./app-setup/app-setup-session');
const seedSchools = require('./scripts/seedSchools'); // Seed schools data#
const seedSemesters = require('./scripts/seedSemesters'); // Seed semesters data
const usersRoutes = require('./routes/users'); // Import users routes
const myCoursesRouter = require('./routes/myCourses');





const app = express();

// 🔧 Ρύθμιση περιβάλλοντος
hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

hbs.registerHelper('ifEquals', function (a, b, options) {
  return a == b ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('eq', function(a, b) {
  return a === b;
});

hbs.registerHelper('includes', function(array, value) {
  if (!Array.isArray(array)) return false;
  return array.includes(value);
});

// 🔒 Setup session
app.use(siteSession);



// 💡 Διαθέσιμο το session.user σε όλα τα views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// 🛠 View engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public', 'views'));

// 🌐 Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/myCourses', express.static('uploads')); // Για αρχεία που ανεβάζουν οι χρήστες

// 📦 Middleware
// Προσθέτεις το middleware για sessions
app.use(siteSession);

// Middleware για parsing φορμών και JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// 🧭 Routes

app.use('/courses', coursesRoutes); 

app.use('/myCourses', myCoursesRouter);

app.use('/', siteRoutes);    
app.use('/users', usersRoutes); // Χρήση των routes για χρήστες

console.log('🚀 Users routes loaded successfully');



seedSchools(); // Εκτελεί το seed κατά την εκκίνηση του server



// 🧨 404 Handler (μόνο αν δεν έχει πιαστεί πιο πάνω)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});




// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
