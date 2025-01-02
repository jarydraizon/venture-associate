const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const { authenticateToken } = require('../utils/auth');

// Create a new venture
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const userId = req.user?.user_id;
    
    if (!userId) {
      console.error('No user_id found in request:', req.user);
      return res.status(401).json({ error: 'User ID not found in request' });
    }

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    // Check for existing venture with same name for this user
    const existingVenture = await pool.query(
      'SELECT * FROM ventures WHERE name = $1 AND user_id = $2',
      [name, userId]
    );

    if (existingVenture.rows.length > 0) {
      return res.status(400).json({ error: 'A venture with this name already exists' });
    }

    const result = await pool.query(
      'INSERT INTO ventures (name, description, user_id) VALUES ($1, $2, $3) RETURNING venture_id',
      [name, description, userId]
    );

    res.status(201).json({ success: true, ventureId: result.rows[0].venture_id });
  } catch (error) {
    console.error('Error creating venture:', error);
    res.status(500).json({ error: 'Failed to create venture' });
  }
});

// Get all ventures for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT venture_id, name, description, created_at FROM ventures WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    res.json({ ventures: result.rows });
  } catch (error) {
    console.error('Error fetching ventures:', error);
    res.status(500).json({ error: 'Failed to fetch ventures' });
  }
});

// Get a specific venture by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM ventures WHERE venture_id = $1 AND user_id = $2',
      [req.params.id, req.user.user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venture not found' });
    }
    
    res.json({ venture: result.rows[0] });
  } catch (error) {
    console.error('Error fetching venture:', error);
    res.status(500).json({ error: 'Failed to fetch venture' });
  }
});

module.exports = router;