const { db } = require('../config/initializeDatabase');

// Create user in database
const createUser = async (username, email, password) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

// Check if user exists in the database
const checkUser = async (username, email = '') => {
    try {
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });

        return user; 
    } catch (error) {
        console.error('Error checking user:', error.message);
        throw error; 
    }
};


module.exports = { createUser, checkUser };