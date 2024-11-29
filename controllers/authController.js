// Import necessary packages and models
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path if needed

// Registration Logic
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password before saving it to the database
    const salt = bcrypt.genSaltSync(10); // Create salt
    const hashedPassword = bcrypt.hashSync(password, salt); // Hash the password

    // Create the new user with the hashed password
    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new user
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Logic
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the functions to be used in the routes
module.exports = { registerUser, loginUser };
