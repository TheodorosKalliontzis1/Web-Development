'use strict';
// Το sqlite-async χρησιμοποιεί το ίδιο API όπως και το sqlite3, αλλά με promises
import { db } from 'sqlite-async';
import bcrypt from 'bcrypt'

let sql;
try {
    sql = await db.open('db/SkyHop.db')
} catch (error) {
    throw Error('Δεν ήταν δυνατό να ανοίξει η βάση δεδομένων.' + error);
}


export let findUserByUsernamePassword = async (email, password) => {
    //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password 
    const stmt = await sql.prepare("SELECT email FROM users WHERE email = ? and password = ? LIMIT 0, 1");
    try {
        const user = await stmt.all(email, password);
    } catch (err) {
        throw err;
    }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη
export let registerUserNoPass = async function (email) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const emailId = getUserByUsername(email);
    if (emailId != undefined) {
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            const stmt = await sql.prepare('INSERT INTO users VALUES (null, ?, ?)');
            const info = await stmt.run(email, username);
            return info.lastInsertRowid;
        } catch (err) {
            throw err;
        }
    }
}

/**
 * Επιστρέφει τον χρήστη με όνομα 'username'
 */
export let getUserByUsername = async (email) => {
    const stmt = await sql.prepare("SELECT id, email, password FROM users WHERE email = ? LIMIT 0, 1");
    try {
        const user = await stmt.all(email);
        return user[0];
    } catch (err) {
        throw err;
    }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη με password
export let registerUser = async function (email, password) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const userId = await getUserByUsername(email);
    if (emailId != undefined) {
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = await sql.prepare('INSERT INTO users VALUES (null, ?, ?)');
            const info = await stmt.run(email, hashedPassword);
            return info.lastID;
        } catch (error) {
            throw error;
        }
    }
}