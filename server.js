
require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoutes = require('./src/api/auth');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
