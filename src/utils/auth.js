const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/config');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check for existing user
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    // Change here
    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET);
    res.status(201).json({ user: result.rows[0], token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Change here
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const hashPassword = async (password) => {
//   return await bcrypt.hash(password, 10);
// };

// const comparePasswords = async (password, hash) => {
//   return await bcrypt.compare(password, hash);
// };

// const generateToken = (userId) => {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error('JWT_SECRET environment variable is not set');
//   }
//   return jwt.sign({ user_id: userId }, secret, { expiresIn: '1d' });
// };

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Authentication required' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.user_id) {
//       console.error('No user_id in token:', decoded);
//       return res.status(401).json({ error: 'Invalid token format' });
//     }
//     req.user = { user_id: decoded.user_id };
//     next();
//   } catch (err) {
//     return res.status(403).json({ error: 'Invalid token' });
//   }
// };

// module.exports = { hashPassword, comparePasswords, generateToken, authenticateToken };

