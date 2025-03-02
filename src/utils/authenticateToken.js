
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err.message);
        return res.status(403).json({ error: 'Invalid token' });
      }
      
      if (!decoded || !decoded.id) {
        console.error('Invalid token payload structure:', decoded);
        return res.status(403).json({ error: 'Invalid token structure' });
      }
      
      // Set user info in request
      req.user = {
        id: decoded.id
      };
      
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

module.exports = authenticateToken;
