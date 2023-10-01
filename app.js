require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const cloudinary = require('./config/cloudinaryConfig');

const app = express();
// Initialize cookie-parser right after Express
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // replace with your frontend application's URL
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Import routes
const rugTypeRoutes = require('./routes/rugTypeRoute');
const rugRoutes = require('./routes/rugRoute');
const userRoutes = require('./routes/userRoute');

// Routes
app.use(rugTypeRoutes);
app.use(rugRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
