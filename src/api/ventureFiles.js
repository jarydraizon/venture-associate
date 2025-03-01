
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.user_id;
    const { ventureName } = req.params;
    const { competitorId } = req.query;
    
    let dir;
    if (competitorId) {
      dir = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors', competitorId);
    } else {
      dir = path.join(__dirname, '../../uploads', userId.toString(), ventureName);
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Authentication middleware
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

// Get file list for a venture or competitor
router.get('/:ventureName/files', authenticateUser, (req, res) => {
  try {
    const userId = req.user.user_id;
    const { ventureName } = req.params;
    const { competitorId } = req.query;
    
    let dir;
    if (competitorId) {
      dir = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors', competitorId);
    } else {
      dir = path.join(__dirname, '../../uploads', userId.toString(), ventureName);
    }

    // Check if directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      return res.json({ files: [] });
    }

    // Read directory and filter out system and metadata files
    const files = fs.readdirSync(dir)
      .filter(filename => filename !== 'venture_details.json' && filename !== 'competitors.json')
      .map(filename => {
        const filePath = path.join(dir, filename);
        const stats = fs.statSync(filePath);
        return {
          name: filename,
          path: `/uploads/${userId}/${ventureName}${competitorId ? `/competitors/${competitorId}` : ''}/${filename}`,
          size: stats.size,
          isDirectory: stats.isDirectory(),
          createdAt: stats.birthtime
        };
      });

    res.json({ files });
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(500).json({ error: 'Failed to get files' });
  }
});

// Upload files for a venture or competitor
router.post('/:ventureName/upload', authenticateUser, upload.array('files'), (req, res) => {
  try {
    const userId = req.user.user_id;
    const { ventureName } = req.params;
    const { competitorId } = req.query;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const basePath = competitorId 
      ? `/uploads/${userId}/${ventureName}/competitors/${competitorId}/` 
      : `/uploads/${userId}/${ventureName}/`;

    const fileInfos = req.files.map(file => ({
      name: file.originalname,
      path: basePath + file.originalname,
      size: file.size
    }));

    res.status(201).json({ 
      success: true,
      files: fileInfos 
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Add URL reference for a venture or competitor
router.post('/:ventureName/urls', authenticateUser, (req, res) => {
  try {
    const userId = req.user.user_id;
    const { ventureName } = req.params;
    const { competitorId } = req.query;
    const { url, description } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    let urlsFilePath;
    if (competitorId) {
      const competitorDir = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors', competitorId);
      if (!fs.existsSync(competitorDir)) {
        fs.mkdirSync(competitorDir, { recursive: true });
      }
      urlsFilePath = path.join(competitorDir, 'urls.json');
    } else {
      const ventureDir = path.join(__dirname, '../../uploads', userId.toString(), ventureName);
      urlsFilePath = path.join(ventureDir, 'urls.json');
    }

    let urls = [];
    if (fs.existsSync(urlsFilePath)) {
      urls = JSON.parse(fs.readFileSync(urlsFilePath, 'utf8'));
    }

    const newUrl = {
      id: Date.now().toString(),
      url,
      description: description || '',
      addedAt: new Date().toISOString()
    };

    urls.push(newUrl);
    fs.writeFileSync(urlsFilePath, JSON.stringify(urls, null, 2));

    res.status(201).json({ 
      success: true,
      url: newUrl 
    });
  } catch (error) {
    console.error('Error adding URL:', error);
    res.status(500).json({ error: 'Failed to add URL' });
  }
});

// Get URLs for a venture or competitor
router.get('/:ventureName/urls', authenticateUser, (req, res) => {
  try {
    const userId = req.user.user_id;
    const { ventureName } = req.params;
    const { competitorId } = req.query;

    let urlsFilePath;
    if (competitorId) {
      urlsFilePath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors', competitorId, 'urls.json');
    } else {
      urlsFilePath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'urls.json');
    }

    if (!fs.existsSync(urlsFilePath)) {
      return res.json({ urls: [] });
    }

    const urls = JSON.parse(fs.readFileSync(urlsFilePath, 'utf8'));
    res.json({ urls });
  } catch (error) {
    console.error('Error getting URLs:', error);
    res.status(500).json({ error: 'Failed to get URLs' });
  }
});

// Delete a URL reference
router.delete('/:ventureName/urls/:urlId', authenticateUser, (req, res) => {
  try {
    const userId = req.user.user_id;
    const { ventureName, urlId } = req.params;
    const { competitorId } = req.query;

    let urlsFilePath;
    if (competitorId) {
      urlsFilePath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors', competitorId, 'urls.json');
    } else {
      urlsFilePath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'urls.json');
    }

    if (!fs.existsSync(urlsFilePath)) {
      return res.status(404).json({ error: 'URLs file not found' });
    }

    const urls = JSON.parse(fs.readFileSync(urlsFilePath, 'utf8'));
    const updatedUrls = urls.filter(url => url.id !== urlId);

    if (urls.length === updatedUrls.length) {
      return res.status(404).json({ error: 'URL not found' });
    }

    fs.writeFileSync(urlsFilePath, JSON.stringify(updatedUrls, null, 2));

    res.json({ 
      success: true,
      message: 'URL deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting URL:', error);
    res.status(500).json({ error: 'Failed to delete URL' });
  }
});

// Delete a file
router.delete('/:ventureName/files/:fileName', authenticateUser, (req, res) => {
  try {
    const userId = req.user.user_id;
    const { ventureName, fileName } = req.params;
    const { competitorId } = req.query;

    let filePath;
    if (competitorId) {
      filePath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, 'competitors', competitorId, fileName);
    } else {
      filePath = path.join(__dirname, '../../uploads', userId.toString(), ventureName, fileName);
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filePath);

    res.json({ 
      success: true,
      message: 'File deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

module.exports = router;
