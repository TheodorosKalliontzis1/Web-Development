// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
const { username, surname, student_id, email, password, role} = req.body;
try {
    // Κρυπτογράφηση κωδικού
    const hashedPassword = await bcrypt.hash(password, 10);

    // Δημιουργία νέου χρήστη
    const newUser = await User.create({ 
        username, 
        surname, 
        student_id, 
        email, 
        password: hashedPassword,
        role : role || 'student' // Προεπιλεγμένος ρόλος αν δεν δοθεί
    });

    // Αποθήκευση στο session με το σωστό αντικείμενο
    req.session.user = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        email: newUser.email,
        surname: newUser.surname,
        student_id: newUser.student_id
    };
    res.render('main', {
        user: req.session.user,
        isAdmin: req.session.user?.role === 'admin'
    });
    res.redirect('/');

} catch (error) {
    res.status(500).send('Error during signup');
}
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            console.log('Χρήστης δεν βρέθηκε');
            return res.status(401).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Λάθος κωδικός');
            return res.status(401).send('Invalid email or password');
        }

        req.session.user = user;
        console.log('Επιτυχής σύνδεση:', user);
        res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
};



const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};

const getLoginStatus = (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
};



module.exports = {
    signup,
    login,
    logout,
    getLoginStatus
};