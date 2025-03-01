
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/api/auth');
const ventureRoutes = require('./src/api/ventures');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use('/api/chat', require('./src/api/chat.js'));
app.use('/api', require('./src/api/landingPageAnalyzer.js'));

// Mount API routes first
app.use('/api/auth', authRoutes);
app.use('/api/ventures', ventureRoutes);
// Make sure this module exports a router
if (require('./src/api/ventureFiles.js')) {
  app.use('/api/venture-files', require('./src/api/ventureFiles.js'));
}

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Always serve index.html for any other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: __dirname });
});

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
