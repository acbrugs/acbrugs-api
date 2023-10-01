// controllers/userController.js

const User = require('../models/userModal');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtHelpers');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
  });

  await newUser.save();

  const token = generateToken({id:newUser._id,role:newUser.role});

  // On successful authentication, set HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'strict',
    maxAge: 86400000, // 1 day
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id);

  // On successful authentication, set HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'strict',
    maxAge: 86400000, // 1 day
  });

  res.json({ success: true });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Successfully logged out' });
};
