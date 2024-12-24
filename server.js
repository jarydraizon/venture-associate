
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/api/auth');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
