// controllers/userController.js

const User = require('../models/userModal');
const bcrypt = require('bcryptjs');
const logger = require('../config/logger');
const { generateToken } = require('../utils/jwtHelpers');

exports.register = async (req, res) => {
  logger.info(
    `Attempting to register a new user with email: ${req.body.email}`
  );
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();

    const token = generateToken({ id: newUser._id, role: newUser.role });

    // On successful authentication, set HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'None; Secure', 
      maxAge: 86400000, // 1 day
    });
    logger.info(`User registered successfully with ID: ${newUser._id}`);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    logger.error(
      `Registration failed for email ${req.body.email}: ${err.message}`
    );
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message:
          'Duplicate field value entered. Username or email already in use.',
      });
    }

    // Handle other types of errors
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    logger.info(`Attempting to login user with email: ${req.body.email}`);
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user._id, role: user.role });

    // On successful authentication, set HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'none', 
      maxAge: 86400000, // 1 day
    });
    logger.info(`User with ID ${user._id} logged in successfully`);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: 'Invalid credentials' });
    logger.error(`Login failed for email ${req.body.email}: ${err.message}`);
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to logout' });
    logger.error(`Logout failed for user with ID  ${err.message}`);
  }
};
