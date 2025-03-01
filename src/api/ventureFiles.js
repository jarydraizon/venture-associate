
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { authenticateToken } = require('../utils/auth');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const userId = req.user.user_id;
    const ventureName = req.params.ventureName;
    const ventureDir = path.join(uploadsDir, userId.toString(), ventureName);
    
    // Create venture directory if it doesn't exist
    if (!fs.existsSync(ventureDir)) {
      fs.mkdirSync(ventureDir, { recursive: true });
    }
    
    cb(null, ventureDir);
  },
  filename: function(req, file, cb) {
    // Keep original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all files for a venture
router.get('/:ventureName/files', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const ventureName = req.params.ventureName;
    const ventureDir = path.join(uploadsDir, userId.toString(), ventureName);
    
    if (!fs.existsSync(ventureDir)) {
      return res.json({ files: [] });
    }
    
    const files = fs.readdirSync(ventureDir)
      .filter(file => !file.endsWith('.json') && !file.endsWith('.txt')) // Exclude metadata files
      .map(file => ({
        name: file,
        path: `/api/venture-files/${ventureName}/download/${file}`,
        uploadDate: fs.statSync(path.join(ventureDir, file)).mtime
      }));
    
    res.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Upload files for a venture
router.post('/:ventureName/upload', authenticateToken, upload.array('files'), async (req, res) => {
  try {
    res.json({ 
      success: true, 
      message: 'Files uploaded successfully',
      files: req.files.map(file => file.originalname)
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Download a specific file
router.get('/:ventureName/download/:fileName', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const ventureName = req.params.ventureName;
    const fileName = req.params.fileName;
    const filePath = path.join(uploadsDir, userId.toString(), ventureName, fileName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.download(filePath);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// Save venture details
router.post('/:ventureName/details', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const ventureName = req.params.ventureName;
    const ventureDir = path.join(uploadsDir, userId.toString(), ventureName);
    
    if (!fs.existsSync(ventureDir)) {
      fs.mkdirSync(ventureDir, { recursive: true });
    }
    
    const detailsPath = path.join(ventureDir, 'venture_details.json');
    fs.writeFileSync(detailsPath, JSON.stringify(req.body, null, 2));
    
    res.json({ success: true, message: 'Venture details saved successfully' });
  } catch (error) {
    console.error('Error saving venture details:', error);
    res.status(500).json({ error: 'Failed to save venture details' });
  }
});

// Get venture details
router.get('/:ventureName/details', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const ventureName = req.params.ventureName;
    const detailsPath = path.join(uploadsDir, userId.toString(), ventureName, 'venture_details.json');
    
    if (!fs.existsSync(detailsPath)) {
      return res.json({ details: null });
    }
    
    const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
    res.json({ details });
  } catch (error) {
    console.error('Error fetching venture details:', error);
    res.status(500).json({ error: 'Failed to fetch venture details' });
  }
});

// Save venture URLs
router.post('/:ventureName/urls', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const ventureName = req.params.ventureName;
    const { urls } = req.body;
    const ventureDir = path.join(uploadsDir, userId.toString(), ventureName);
    
    if (!fs.existsSync(ventureDir)) {
      fs.mkdirSync(ventureDir, { recursive: true });
    }
    
    const urlsPath = path.join(ventureDir, 'venture_urls.txt');
    fs.writeFileSync(urlsPath, urls.join('\n'));
    
    res.json({ success: true, message: 'Venture URLs saved successfully' });
  } catch (error) {
    console.error('Error saving venture URLs:', error);
    res.status(500).json({ error: 'Failed to save venture URLs' });
  }
});

// Get venture URLs
router.get('/:ventureName/urls', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const ventureName = req.params.ventureName;
    const urlsPath = path.join(uploadsDir, userId.toString(), ventureName, 'venture_urls.txt');
    
    if (!fs.existsSync(urlsPath)) {
      return res.json({ urls: [] });
    }
    
    const urls = fs.readFileSync(urlsPath, 'utf8').split('\n').filter(url => url.trim());
    res.json({ urls });
  } catch (error) {
    console.error('Error fetching venture URLs:', error);
    res.status(500).json({ error: 'Failed to fetch venture URLs' });
  }
});

module.exports = router;
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

const upload = multer({ storage });

// Get all files for a venture
router.get('/:userId/:ventureName', (req, res) => {
  try {
    const { userId, ventureName } = req.params;
    const dir = path.join(__dirname, '../../uploads', userId, ventureName);
    
    if (!fs.existsSync(dir)) {
      return res.json({ files: [] });
    }
    
    const files = fs.readdirSync(dir);
    return res.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    return res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Upload a file
router.post('/:userId/:ventureName', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    return res.json({ 
      success: true,
      filename: req.file.originalname 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Delete a file
router.delete('/:userId/:ventureName/:filename', (req, res) => {
  try {
    const { userId, ventureName, filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', userId, ventureName, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    fs.unlinkSync(filePath);
    return res.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ error: 'Failed to delete file' });
  }
});

module.exports = router;
