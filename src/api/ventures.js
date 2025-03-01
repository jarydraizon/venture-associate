const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const authenticateToken = require('../utils/authenticateToken');

// Get all ventures for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Getting ventures for user ID:', req.user.id);

    const result = await pool.query(
      'SELECT * FROM ventures WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    console.log('Found ventures:', result.rows);
    return res.json({ ventures: result.rows });
  } catch (error) {
    console.error('Error fetching ventures:', error);
    return res.status(500).json({ error: 'Failed to fetch ventures' });
  }
});

// Create a new venture
router.post('/', authenticateToken, async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Venture name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO ventures (name, description, user_id) VALUES ($1, $2, $3) RETURNING venture_id',
      [name, description || '', req.user.id]
    );

    return res.status(201).json({ success: true, ventureId: result.rows[0].venture_id });
  } catch (error) {
    console.error('Error creating venture:', error);
    return res.status(500).json({ error: 'Failed to create venture' });
  }
});

// Get details for a specific venture
router.get('/:name/details', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;

    // First, check if the venture exists and belongs to the user
    const ventureCheck = await pool.query(
      'SELECT venture_id FROM ventures WHERE name = $1 AND user_id = $2',
      [name, req.user.id]
    );

    if (ventureCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Venture not found or not authorized' });
    }

    const ventureId = ventureCheck.rows[0].venture_id;

    // Get venture details from venture_details table
    const detailsResult = await pool.query(
      'SELECT * FROM venture_details WHERE venture_id = $1',
      [ventureId]
    );

    return res.json({ details: detailsResult.rows[0] || null });
  } catch (error) {
    console.error('Error fetching venture details:', error);
    return res.status(500).json({ error: 'Failed to fetch venture details' });
  }
});

// Save venture details
router.post('/:name/details', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const details = req.body;
    
    console.log('Saving details for venture:', name);
    console.log('Details received:', details);

    // First, check if the venture exists and belongs to the user
    const ventureCheck = await pool.query(
      'SELECT venture_id FROM ventures WHERE name = $1 AND user_id = $2',
      [name, req.user.id]
    );

    if (ventureCheck.rows.length === 0) {
      console.log('Venture not found or not authorized');
      return res.status(404).json({ error: 'Venture not found or not authorized' });
    }

    const ventureId = ventureCheck.rows[0].venture_id;
    console.log('Found venture ID:', ventureId);

    // Check if details already exist for this venture
    const detailsCheck = await pool.query(
      'SELECT venture_id FROM venture_details WHERE venture_id = $1',
      [ventureId]
    );

    if (detailsCheck.rows.length > 0) {
      // Update existing details
      console.log('Updating existing venture details');
      try {
        await pool.query(
          `UPDATE venture_details 
           SET industry = $1, website = $2, regions = $3, description = $4
           WHERE venture_id = $5`,
          [details.industry || '', details.website || '', details.regions || '', details.description || '', ventureId]
        );
        console.log('Details updated successfully');
      } catch (err) {
        console.error('Error updating details:', err);
        throw err;
      }
    } else {
      // Insert new details
      console.log('Inserting new venture details');
      try {
        await pool.query(
          `INSERT INTO venture_details (venture_id, industry, website, regions, description)
           VALUES ($1, $2, $3, $4, $5)`,
          [ventureId, details.industry || '', details.website || '', details.regions || '', details.description || '']
        );
        console.log('Details inserted successfully');
      } catch (err) {
        console.error('Error inserting details:', err);
        throw err;
      }
    }

    return res.json({ success: true, message: 'Venture details saved successfully' });
  } catch (error) {
    console.error('Error saving venture details:', error);
    return res.status(500).json({ error: 'Failed to save venture details: ' + error.message });
  }
});

// Get competitors for a specific venture
router.get('/:name/competitors', authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;

    // First, check if the venture exists and belongs to the user
    const ventureCheck = await pool.query(
      'SELECT venture_id FROM ventures WHERE name = $1 AND user_id = $2',
      [name, req.user.id]
    );

    if (ventureCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Venture not found or not authorized' });
    }

    const ventureId = ventureCheck.rows[0].venture_id;

    // Get competitors for this venture
    const competitorsResult = await pool.query(
      'SELECT * FROM competitors WHERE venture_id = $1',
      [ventureId]
    );

    return res.json({ competitors: competitorsResult.rows });
  } catch (error) {
    console.error('Error fetching competitors:', error);
    return res.status(500).json({ error: 'Failed to fetch competitors' });
  }
});

module.exports = router;