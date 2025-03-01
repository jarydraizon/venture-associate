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
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('./auth');

// Base directory for venture data
const getVentureDir = (ventureName) => {
  return path.join(__dirname, '../../uploads/4', ventureName);
};

// Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

// Get venture details
router.get('/:ventureName/details', authenticateToken, (req, res) => {
  try {
    const { ventureName } = req.params;
    const ventureDir = getVentureDir(ventureName);
    const detailsPath = path.join(ventureDir, 'venture_details.json');
    
    if (fs.existsSync(detailsPath)) {
      const details = JSON.parse(fs.readFileSync(detailsPath, 'utf-8'));
      return res.json({ details });
    }
    
    return res.json({ details: null });
  } catch (err) {
    console.error('Error getting venture details:', err);
    return res.status(500).json({ error: 'Failed to retrieve venture details' });
  }
});

// Save venture details
router.post('/:ventureName/details', authenticateToken, (req, res) => {
  try {
    const { ventureName } = req.params;
    const ventureDir = ensureDir(getVentureDir(ventureName));
    const detailsPath = path.join(ventureDir, 'venture_details.json');
    
    fs.writeFileSync(detailsPath, JSON.stringify(req.body, null, 2));
    
    return res.json({ success: true });
  } catch (err) {
    console.error('Error saving venture details:', err);
    return res.status(500).json({ error: 'Failed to save venture details' });
  }
});

// Get venture competitors
router.get('/:ventureName/competitors', authenticateToken, (req, res) => {
  try {
    const { ventureName } = req.params;
    const ventureDir = getVentureDir(ventureName);
    const competitorsDir = path.join(ventureDir, 'competitors');
    
    if (!fs.existsSync(competitorsDir)) {
      return res.json({ competitors: [] });
    }
    
    const competitors = [];
    const competitorDirs = fs.readdirSync(competitorsDir);
    
    for (const dir of competitorDirs) {
      const detailsPath = path.join(competitorsDir, dir, 'details.json');
      
      if (fs.existsSync(detailsPath)) {
        const details = JSON.parse(fs.readFileSync(detailsPath, 'utf-8'));
        competitors.push({
          id: dir,
          ...details
        });
      }
    }
    
    return res.json({ competitors });
  } catch (err) {
    console.error('Error getting competitors:', err);
    return res.status(500).json({ error: 'Failed to retrieve competitors' });
  }
});

// Add competitor
router.post('/:ventureName/competitors', authenticateToken, (req, res) => {
  try {
    const { ventureName } = req.params;
    const ventureDir = ensureDir(getVentureDir(ventureName));
    const competitorsDir = ensureDir(path.join(ventureDir, 'competitors'));
    
    // Generate a unique ID for the competitor
    const competitorId = Date.now().toString();
    const competitorDir = ensureDir(path.join(competitorsDir, competitorId));
    
    // Save competitor details
    const detailsPath = path.join(competitorDir, 'details.json');
    fs.writeFileSync(detailsPath, JSON.stringify(req.body, null, 2));
    
    // Return the competitor with the generated ID
    return res.json({
      success: true,
      competitor: {
        id: competitorId,
        ...req.body
      }
    });
  } catch (err) {
    console.error('Error adding competitor:', err);
    return res.status(500).json({ error: 'Failed to add competitor' });
  }
});

// Update competitor
router.put('/:ventureName/competitors/:competitorId', authenticateToken, (req, res) => {
  try {
    const { ventureName, competitorId } = req.params;
    const ventureDir = getVentureDir(ventureName);
    const competitorDir = path.join(ventureDir, 'competitors', competitorId);
    
    if (!fs.existsSync(competitorDir)) {
      return res.status(404).json({ error: 'Competitor not found' });
    }
    
    // Save updated competitor details
    const detailsPath = path.join(competitorDir, 'details.json');
    fs.writeFileSync(detailsPath, JSON.stringify(req.body, null, 2));
    
    return res.json({
      success: true,
      competitor: {
        id: competitorId,
        ...req.body
      }
    });
  } catch (err) {
    console.error('Error updating competitor:', err);
    return res.status(500).json({ error: 'Failed to update competitor' });
  }
});

// Delete competitor
router.delete('/:ventureName/competitors/:competitorId', authenticateToken, (req, res) => {
  try {
    const { ventureName, competitorId } = req.params;
    const ventureDir = getVentureDir(ventureName);
    const competitorDir = path.join(ventureDir, 'competitors', competitorId);
    
    if (!fs.existsSync(competitorDir)) {
      return res.status(404).json({ error: 'Competitor not found' });
    }
    
    // Delete competitor directory
    fs.rmSync(competitorDir, { recursive: true, force: true });
    
    return res.json({ success: true });
  } catch (err) {
    console.error('Error deleting competitor:', err);
    return res.status(500).json({ error: 'Failed to delete competitor' });
  }
});

module.exports = router;
