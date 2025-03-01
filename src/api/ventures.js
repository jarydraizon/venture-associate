
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
  // Get token from request headers
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization required' });
  }
  
  try {
    // Verify token
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all ventures for a user
router.get('/', authenticateUser, (req, res) => {
  try {
    const userId = req.user.user_id;
    const userDir = path.join(__dirname, '../../uploads', userId.toString());
    
    if (!fs.existsSync(userDir)) {
      return res.json({ ventures: [] });
    }
    
    const ventures = fs.readdirSync(userDir);
    return res.json({ ventures });
  } catch (error) {
    console.error('Error fetching ventures:', error);
    return res.status(500).json({ error: 'Failed to fetch ventures' });
  }
});

// Create a new venture
router.post('/', authenticateUser, (req, res) => {
  try {
    const { name, description, industry, website, regions } = req.body;
    const userId = req.user.user_id;
    
    if (!name) {
      return res.status(400).json({ error: 'Venture name is required' });
    }
    
    const ventureDir = path.join(__dirname, '../../uploads', userId.toString(), name);
    
    if (fs.existsSync(ventureDir)) {
      return res.status(400).json({ error: 'Venture already exists' });
    }
    
    // Create venture directory
    fs.mkdirSync(ventureDir, { recursive: true });
    
    // Save venture details
    const ventureDetails = {
      name,
      description,
      industry,
      website,
      regions
    };
    
    fs.writeFileSync(
      path.join(ventureDir, 'venture_details.json'),
      JSON.stringify(ventureDetails, null, 2)
    );
    
    return res.status(201).json({ 
      success: true,
      venture: ventureDetails
    });
  } catch (error) {
    console.error('Error creating venture:', error);
    return res.status(500).json({ error: 'Failed to create venture' });
  }
});

// Get venture details
router.get('/:ventureName', authenticateUser, (req, res) => {
  try {
    const { ventureName } = req.params;
    const userId = req.user.user_id;
    const detailsPath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'venture_details.json');
    
    if (!fs.existsSync(detailsPath)) {
      return res.json({ details: null });
    }
    
    const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
    return res.json({ details });
  } catch (error) {
    console.error('Error fetching venture details:', error);
    return res.status(500).json({ error: 'Failed to fetch venture details' });
  }
});

// Update venture details
router.put('/:ventureName', authenticateUser, (req, res) => {
  try {
    const { ventureName } = req.params;
    const userId = req.user.user_id;
    const detailsPath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'venture_details.json');
    
    if (!fs.existsSync(detailsPath)) {
      return res.status(404).json({ error: 'Venture not found' });
    }
    
    const currentDetails = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
    const updatedDetails = { ...currentDetails, ...req.body };
    
    fs.writeFileSync(detailsPath, JSON.stringify(updatedDetails, null, 2));
    
    return res.json({ 
      success: true,
      details: updatedDetails 
    });
  } catch (error) {
    console.error('Error updating venture details:', error);
    return res.status(500).json({ error: 'Failed to update venture details' });
  }
});

// Get competitors
router.get('/:ventureName/competitors', authenticateUser, (req, res) => {
  try {
    const { ventureName } = req.params;
    const userId = req.user.user_id;
    const competitorsPath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors.json');
    
    if (!fs.existsSync(competitorsPath)) {
      // If file doesn't exist, create an empty competitors file
      fs.writeFileSync(competitorsPath, JSON.stringify([], null, 2));
      return res.json({ competitors: [] });
    }
    
    const competitors = JSON.parse(fs.readFileSync(competitorsPath, 'utf8'));
    return res.json({ competitors });
  } catch (error) {
    console.error('Error fetching competitors:', error);
    return res.status(500).json({ error: 'Failed to fetch competitors' });
  }
});

// Add a competitor
router.post('/:ventureName/competitors', authenticateUser, (req, res) => {
  try {
    const { ventureName } = req.params;
    const userId = req.user.user_id;
    const { name, website, strengths, weaknesses } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Competitor name is required' });
    }
    
    const competitorsPath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors.json');
    let competitors = [];
    
    if (fs.existsSync(competitorsPath)) {
      competitors = JSON.parse(fs.readFileSync(competitorsPath, 'utf8'));
    }
    
    // Check if competitor already exists
    const existingIndex = competitors.findIndex(c => c.name === name);
    
    if (existingIndex >= 0) {
      // Update existing competitor
      competitors[existingIndex] = {
        ...competitors[existingIndex],
        website,
        strengths,
        weaknesses
      };
    } else {
      // Add new competitor
      competitors.push({
        id: Date.now().toString(),
        name,
        website,
        strengths,
        weaknesses
      });
    }
    
    fs.writeFileSync(competitorsPath, JSON.stringify(competitors, null, 2));
    
    return res.status(201).json({ 
      success: true,
      competitors 
    });
  } catch (error) {
    console.error('Error adding competitor:', error);
    return res.status(500).json({ error: 'Failed to add competitor: ' + error.message });
  }
});

// Delete a competitor
router.delete('/:ventureName/competitors/:competitorId', authenticateUser, (req, res) => {
  try {
    const { ventureName, competitorId } = req.params;
    const userId = req.user.user_id;
    const competitorsPath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors.json');
    
    if (!fs.existsSync(competitorsPath)) {
      return res.status(404).json({ error: 'Competitors file not found' });
    }
    
    let competitors = JSON.parse(fs.readFileSync(competitorsPath, 'utf8'));
    competitors = competitors.filter(c => c.id !== competitorId);
    
    fs.writeFileSync(competitorsPath, JSON.stringify(competitors, null, 2));
    
    return res.json({ 
      success: true,
      competitors 
    });
  } catch (error) {
    console.error('Error deleting competitor:', error);
    return res.status(500).json({ error: 'Failed to delete competitor' });
  }
});

module.exports = router;
