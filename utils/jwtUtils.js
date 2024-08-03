const jwt = require('jsonwebtoken');
const env = require('dotenv')
env.config()

const {JWT_SECRET} = process.env
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET);
};

module.exports = { generateToken };
