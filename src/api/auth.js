
const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const { hashPassword, comparePasswords, generateToken } = require('../utils/auth');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    
    const token = generateToken(result.rows[0].id);
    res.json({ user: result.rows[0], token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const valid = await comparePasswords(password, result.rows[0].password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(result.rows[0].id);
    res.json({ 
      user: { id: result.rows[0].id, email: result.rows[0].email },
      token 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
