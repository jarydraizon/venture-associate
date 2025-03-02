const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle different token payload structures
    if (!decoded) {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    // Set user info in request - handle both formats
    req.user = {
      id: decoded.user_id || decoded.id || null
    };

    if (!req.user.id) {
      console.error('Token missing user ID:', decoded);
      return res.status(403).json({ error: 'Invalid token payload: missing user ID' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;