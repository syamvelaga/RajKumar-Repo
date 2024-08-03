const bcryptjs = require('bcryptjs')

const { createUser, checkUser } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');


// Register function
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the password is long enough
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password should be at least 8 characters' });
        }

        // Check if user already exists
        const isUserFound = await checkUser(username, email);
        if (isUserFound) {
            return res.status(400).json({ message: 'User Already Exists...' });
        }

        // Hash password and create user
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await createUser(username, email, hashedPassword);
        const token = generateToken(user.id);

        return res.status(201).json({ token });

    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login function
const LoginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const user = await checkUser(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password matches
        const isMatched = await bcryptjs.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate and send token
        const token = generateToken(user.id);
        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error while logging in user:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = { register, LoginUser };
