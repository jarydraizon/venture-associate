
const express = require('express');
const cors = require('cors');
const authRoutes = require('./api/auth');
const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.static('build'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
