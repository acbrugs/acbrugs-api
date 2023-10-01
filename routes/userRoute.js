// routes/userRoutes.js

const express = require('express');
const { register, login, logout } = require('../controllers/userController');

const router = express.Router();

router.post('/api/users/register', register);
router.post('/api/users/login', login);
router.get('/api/users/logout', logout);

// To logout user
// fetch('http://localhost:4000/logout', {
//   credentials: 'include',
// })

module.exports = router;
