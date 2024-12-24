
require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoutes = require('./src/api/auth');
const app = express();

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
