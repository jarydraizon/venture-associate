const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const { authenticateToken } = require('../utils/auth');

// POST request to create a new venture
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const { user_id } = req.user;

    const result = await pool.query(
      'INSERT INTO ventures (name, description, user_id) VALUES ($1, $2, $3) RETURNING venture_id',
      [name, description, user_id]
    );

    res.status(201).json({ success: true, ventureId: result.rows[0].venture_id });
  } catch (error) {
    console.error('Error creating venture:', error);
    res.status(500).json({ error: 'Failed to create venture' });
  }
});

// Export the router so it can be used in server.js
module.exports = router;