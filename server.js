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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);

  // Send a more detailed error response
  res.status(500).json({
    error: 'Server error',
    message: err.message || 'Unknown error occurred',
    path: req.path
  });
});

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const startServer = (port) => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try with a different port
        const newPort = port + 1;
        console.log(`Port ${port} is busy, trying port ${newPort}...`);
        startServer(newPort);
      } else {
        console.error('Server error:', err);
      }
    });
  };

  const PORT = process.env.PORT || 3001;
  startServer(PORT);
}

module.exports = app;