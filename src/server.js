
require('dotenv').config(); // Load environment variables first
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./api/auth'); // Fix the path

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Serve static files
app.use(express.static('build'));

const PORT = 3001;
app.listen(PORT, 'localhost', () => {
  console.log(`Server running on port ${PORT}`);
});
