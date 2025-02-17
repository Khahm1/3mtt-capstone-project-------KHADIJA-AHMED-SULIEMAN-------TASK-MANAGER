const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getTasks).post(protect, createTask);

module.exports = router;
