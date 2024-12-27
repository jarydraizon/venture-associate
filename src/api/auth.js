
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/config');
const { verifyToken } = require('../utils/auth'); // Ensure this path is correct

// This route handles new user registration
router.post('/signup', async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;
  
  try {
    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the password is strong enough (at least 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if a user with this email already exists in the database
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    // If user exists, return an error
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // If user doesn't exist, create a new one:
    // 1. First, encrypt the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    // 3. Create a JWT (JSON Web Token) for authentication
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Send back success response with user info and token
    res.status(201).json({
      success: true,
      user: { id: result.rows[0].id, email: result.rows[0].email },
      token
    });
  } catch (err) {
    // Log any errors for debugging
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to create account', details: err.message });
  }
});

// This route handles user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Look up the user in the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    // If no user found, return error
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Compare provided password with stored encrypted password
    const valid = await bcrypt.compare(password, result.rows[0].password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create authentication token
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send success response
    res.status(200).json({
      success: true,
      user: { id: result.rows[0].id, email: result.rows[0].email },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

module.exports = router;

// CREATING A VENTURE

// Create a venture
router.post('/', verifyToken, async (req, res) => {
    const { name, description } = req.body;
    const userId = req.userId; // Retrieve user ID from the verified token

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO ventures (user_id, name, description) VALUES ($1, $2, $3) RETURNING venture_id',
            [userId, name, description]
        );

        res.status(201).json({ success: true, ventureId: result.rows[0].venture_id });
    } catch (err) {
        console.error('Error creating venture:', err);
        res.status(500).json({ error: 'Failed to create venture' });
    }
});

module.exports = router;