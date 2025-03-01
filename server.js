
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/api/auth');
const ventureRoutes = require('./src/api/ventures');
const ventureFilesRoutes = require('./src/api/ventureFiles');
const chatRoutes = require('./src/api/chat');
const landingPageAnalyzerRoutes = require('./src/api/landingPageAnalyzer');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mount API routes first
app.use('/api/auth', authRoutes);
app.use('/api/ventures', ventureRoutes);
app.use('/api/venture-files', ventureFilesRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', landingPageAnalyzerRoutes);

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
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // Try with a different port if 3001 is in use
      const newPort = PORT + 1;
      console.log(`Port ${PORT} is busy, trying port ${newPort}...`);
      const newServer = app.listen(newPort, '0.0.0.0', () => {
        console.log(`Server running on port ${newPort}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
}

module.exports = app;
