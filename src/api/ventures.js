const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const { verifyToken } = require('../utils/auth'); // Ensure this path is correct

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

module.exports = router; // Export venture-related routes