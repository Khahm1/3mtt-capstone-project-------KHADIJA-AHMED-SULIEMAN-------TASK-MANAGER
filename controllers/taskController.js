const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  const task = await Task.create({
    title,
    description,
    deadline,
    priority,
    user: req.user._id, // Reference the logged-in user
  });

  res.status(201).json(task);
};

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

module.exports = { createTask, getTasks };
