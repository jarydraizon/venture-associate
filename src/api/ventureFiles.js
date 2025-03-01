const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const userId = req.user ? req.user.id : '0';
    const ventureName = req.params.ventureName || 'default';
    const dir = path.join(__dirname, '../../uploads', userId, ventureName);

    // Create directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Get file list for a venture
router.get('/:ventureName/files', authenticateUser, (req, res) => {
  try {
    const userId = req.user.id;
    const { ventureName } = req.params;
    const dir = path.join(__dirname, '../../uploads', userId, ventureName);

    // Check if directory exists
    if (!fs.existsSync(dir)) {
      return res.json({ files: [] });
    }

    // Read directory
    const files = fs.readdirSync(dir).map(filename => {
      return {
        name: filename,
        path: `/uploads/${userId}/${ventureName}/${filename}`,
        size: fs.statSync(path.join(dir, filename)).size
      };
    });

    res.json({ files });
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(500).json({ error: 'Failed to get files' });
  }
});

// Upload files for a venture
router.post('/:ventureName/upload', authenticateUser, upload.array('files'), (req, res) => {
  try {
    const userId = req.user.id;
    const { ventureName } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const fileInfos = req.files.map(file => ({
      name: file.originalname,
      path: `/uploads/${userId}/${ventureName}/${file.originalname}`,
      size: file.size
    }));

    res.json({ files: fileInfos });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Delete a file
router.delete('/:ventureName/files/:filename', authenticateUser, (req, res) => {
  try {
    const userId = req.user.id;
    const { ventureName, filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', userId, ventureName, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filePath);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Save URLs for a venture
router.post('/:ventureName/urls', authenticateUser, (req, res) => {
  try {
    const userId = req.user.id;
    const { ventureName } = req.params;
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: 'Invalid URLs format' });
    }

    const dir = path.join(__dirname, '../../uploads', userId, ventureName);
    fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, 'urls.json');
    fs.writeFileSync(filePath, JSON.stringify({ urls }));

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving URLs:', error);
    res.status(500).json({ error: 'Failed to save URLs' });
  }
});

// Get URLs for a venture
router.get('/:ventureName/urls', authenticateUser, (req, res) => {
  try {
    const userId = req.user.id;
    const { ventureName } = req.params;
    const filePath = path.join(__dirname, '../../uploads', userId, ventureName, 'urls.json');

    if (!fs.existsSync(filePath)) {
      return res.json({ urls: [] });
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ urls: data.urls || [] });
  } catch (error) {
    console.error('Error getting URLs:', error);
    res.status(500).json({ error: 'Failed to get URLs' });
  }
});

module.exports = router;