const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authcontroller'); // Adjust path if necessary

// Route for registration (signup)
router.post('/register', registerUser);

// Route for login
router.post('/login', loginUser);

module.exports = router;

