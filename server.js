
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/api/auth');
const app = express();

// Enable CORS
app.use(cors({
  origin: ['https://venture-associate.bf4f9ef4-d20e-442f-9fb7-9fec72d5f47a-00-zorraerlixil.spock.replit.dev', 'https://bf4f9ef4-d20e-442f-9fb7-9fec72d5f47a-00-zorraerlixil.spock.replit.dev'],
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
