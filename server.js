
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/api/auth');
const app = express();

app.use(cors({
  origin: 'http://0.0.0.0:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
