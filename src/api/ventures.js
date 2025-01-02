const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../utils/auth');

// Debug route
router.get('/debug', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ventures');
    res.json({ ventures: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ventures' });
  }
});

// Create a new venture
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const userId = req.user.user_id; // Ensure we are getting user_id from the request

    // Logging details to help with debugging
    console.log('Creating venture with user_id:', userId)

    if (!userId) {
      console.error('No user_id found in request:', req.user);
      return res.status(401).json({ error: 'User ID not found in request' });
    }

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    // Check for existing venture with same name for this user (case insensitive)
    const existingVenture = await pool.query(
      'SELECT * FROM ventures WHERE LOWER(name) = LOWER($1) AND user_id = $2',
      [name, userId]
    );

    if (existingVenture.rows.length > 0) {
      return res.status(400).json({ error: 'A venture with this name already exists' });
    }

    console.log('Creating venture with user_id:', userId);
    const result = await pool.query(
      'INSERT INTO ventures (name, description, user_id) VALUES ($1, $2, $3) RETURNING venture_id',
      [name, description, userId]
    );
    console.log('Venture created:', result.rows[0]);

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
      'SELECT venture_id, name, description, created_at, active FROM ventures WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    res.json({ ventures: result.rows });
  } catch (error) {
    console.error('Error fetching ventures:', error);
    res.status(500).json({ error: 'Failed to fetch ventures' });
  }
});

// Toggle venture active status
router.put('/:id/toggle', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Deactivate all ventures for this user
    await client.query(
      'UPDATE ventures SET active = false WHERE user_id = $1',
      [req.user.user_id]
    );
    
    // Activate the selected venture
    const result = await client.query(
      'UPDATE ventures SET active = true WHERE venture_id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.user_id]
    );
    
    await client.query('COMMIT');
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venture not found' });
    }
    
    res.json({ venture: result.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error toggling venture:', error);
    res.status(500).json({ error: 'Failed to toggle venture' });
  } finally {
    client.release();
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