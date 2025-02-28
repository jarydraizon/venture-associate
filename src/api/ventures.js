const express = require('express');
const router = express.Router();
const pool = require('../db/config');
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

// Get a specific venture by name
router.get('/:name', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM ventures WHERE name = $1 AND user_id = $2',
      [req.params.name, req.user.user_id]
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
    console.log('Fetching ventures for user:', req.user.user_id);
    const result = await pool.query(
      'SELECT venture_id, name, description, created_at, COALESCE(active, false) as active FROM ventures WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    console.log('Ventures found:', result.rows.length);
    res.json({ ventures: result.rows });
  } catch (error) {
    console.error('Error fetching ventures:', error);
    res.status(500).json({ error: `Failed to fetch ventures: ${error.message}` });
  }
});

// Toggle venture active status
router.put('/:id/toggle-active', authenticateToken, async (req, res) => {
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
// Get files for user
router.get('/files', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM files WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    res.json({ files: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Get web URLs for user
router.get('/web-urls', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM web_urls WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    res.json({ webUrls: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch web URLs' });
  }
});

// Get YouTube URLs for user
router.get('/youtube-urls', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM youtube_urls WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    res.json({ youtubeUrls: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YouTube URLs' });
  }
});

// Get other companies for user
router.get('/other-companies', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM other_companies WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.user_id]
    );
    res.json({ companies: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

router.get('/:name', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM ventures WHERE name = $1 AND user_id = $2',
      [req.params.name, req.user.user_id]
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