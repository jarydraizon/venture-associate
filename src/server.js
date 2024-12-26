
require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./api/auth'); // Fix the path

const app = express();

app.use(cors());
app.use(express.json());

// Test database connection
const pool = require('./db/config');
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mount routes
app.use('/api/auth', authRoutes);

// Serve static files
app.use(express.static('build'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
