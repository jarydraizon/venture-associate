
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/api/auth');
const ventureRoutes = require('./src/api/ventures');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.static('build'));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/ventures', ventureRoutes);

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: __dirname });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// module.exports = app;
