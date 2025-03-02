
const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const authenticateToken = require('../utils/authenticateToken');
const fs = require('node:fs');
const path = require('node:path');

// Get all ventures for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }
    
    // Get ventures from database
    const result = await pool.query(
      'SELECT * FROM ventures WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return res.json({ ventures: result.rows });
  } catch (error) {
    console.error('Error fetching ventures:', error);
    return res.status(500).json({ error: 'Failed to fetch ventures' });
  }
});

// Create a new venture
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: 'Venture name is required' });
    }

    // Insert venture into database
    const result = await pool.query(
      'INSERT INTO ventures (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description || '', userId]
    );

    // Create directory for this venture's files
    const userDir = path.join(__dirname, `../../uploads/${userId}`);
    const ventureDir = path.join(userDir, name);
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    
    if (!fs.existsSync(ventureDir)) {
      fs.mkdirSync(ventureDir, { recursive: true });
    }

    return res.status(201).json({ venture: result.rows[0] });
  } catch (error) {
    console.error('Error creating venture:', error);
    return res.status(500).json({ error: 'Failed to create venture' });
  }
});

// Get venture details
router.get('/:name/details', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }

    console.log(`Getting details for venture ${name} for user ${userId}`);

    // Create directory structure if it doesn't exist
    const userDir = path.join(__dirname, `../../uploads/${userId}`);
    const ventureDir = path.join(userDir, name);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    if (!fs.existsSync(ventureDir)) {
      fs.mkdirSync(ventureDir, { recursive: true });
    }

    // Get venture details from file
    const detailsPath = path.join(ventureDir, 'venture_details.json');

    if (fs.existsSync(detailsPath)) {
      const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
      res.json({ details });
    } else {
      // Return minimal venture details if file doesn't exist
      res.json({ details: { name } });
    }
  } catch (error) {
    console.error('Error getting venture details:', error);
    res.status(500).json({ error: 'Failed to get venture details: ' + error.message });
  }
});

// Update venture details
router.post('/:name/details', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const { details } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }

    // Make sure details is an object
    if (!details || typeof details !== 'object') {
      return res.status(400).json({ error: 'Invalid details format' });
    }

    // Create directory structure if it doesn't exist
    const userDir = path.join(__dirname, `../../uploads/${userId}`);
    const ventureDir = path.join(userDir, name);

    try {
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      if (!fs.existsSync(ventureDir)) {
        fs.mkdirSync(ventureDir, { recursive: true });
      }

      // Save venture details to file
      const detailsPath = path.join(ventureDir, 'venture_details.json');
      fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2));

      return res.json({ success: true });
    } catch (fsError) {
      console.error('Filesystem error when saving venture details:', fsError);
      return res.status(500).json({ error: 'Failed to save venture details due to file system error' });
    }
  } catch (error) {
    console.error('Error saving venture details:', error);
    return res.status(500).json({ error: 'Failed to save venture details: ' + (error.message || 'Unknown error') });
  }
});

// Get competitors for a venture
router.get('/:name/competitors', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }

    console.log(`Getting competitors for venture ${name} for user ${userId}`);

    // Create directory structure if it doesn't exist
    const userDir = path.join(__dirname, `../../uploads/${userId}`);
    const ventureDir = path.join(userDir, name);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    if (!fs.existsSync(ventureDir)) {
      fs.mkdirSync(ventureDir, { recursive: true });
    }

    // Get competitors list from file
    const competitorsPath = path.join(ventureDir, 'competitors.json');

    if (fs.existsSync(competitorsPath)) {
      const competitors = JSON.parse(fs.readFileSync(competitorsPath, 'utf8'));
      res.json({ competitors });
    } else {
      // Return empty array if no competitors file exists
      res.json({ competitors: [] });
    }
  } catch (error) {
    console.error('Error getting competitors:', error);
    res.status(500).json({ error: 'Failed to get competitors: ' + error.message });
  }
});

// Add a competitor
router.post('/:name/competitors', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const competitor = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }

    // Create directory structure if it doesn't exist
    const userDir = path.join(__dirname, `../../uploads/${userId}`);
    const ventureDir = path.join(userDir, name);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    if (!fs.existsSync(ventureDir)) {
      fs.mkdirSync(ventureDir, { recursive: true });
    }

    // Get existing competitors
    const competitorsPath = path.join(ventureDir, 'competitors.json');
    let competitors = [];

    if (fs.existsSync(competitorsPath)) {
      competitors = JSON.parse(fs.readFileSync(competitorsPath, 'utf8'));
    }

    // Add new competitor with a unique ID
    const newCompetitor = {
      id: Date.now().toString(),
      ...competitor,
      created_at: new Date().toISOString()
    };

    competitors.push(newCompetitor);

    // Save competitors to file
    fs.writeFileSync(competitorsPath, JSON.stringify(competitors, null, 2));

    res.status(201).json({ competitor: newCompetitor });
  } catch (error) {
    console.error('Error adding competitor:', error);
    res.status(500).json({ error: 'Failed to add competitor: ' + error.message });
  }
});

// Update venture active status
router.post('/:id/toggle-active', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    
    // Update venture active status
    const result = await pool.query(
      'UPDATE ventures SET active = $1 WHERE venture_id = $2 AND user_id = $3 RETURNING *',
      [active, id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venture not found or not authorized' });
    }
    
    return res.json({ venture: result.rows[0] });
  } catch (error) {
    console.error('Error updating venture active status:', error);
    return res.status(500).json({ error: 'Failed to update venture active status' });
  }
});

module.exports = router;
