const express = require('express');
const router = express.Router();
const { register, LoginUser } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', LoginUser)

module.exports = router;