
const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const { verifyToken } = require('../utils/auth');

router.post('/', verifyToken, async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ventures (name, description, user_id) VALUES ($1, $2, $3) RETURNING venture_id',
      [name, description, req.user.id]
    );
    res.status(201).json({ success: true, ventureId: result.rows[0].venture_id });
  } catch (error) {
    console.error('Error creating venture:', error);
    res.status(500).json({ error: 'Failed to create venture' });
  }
});

module.exports = router;
