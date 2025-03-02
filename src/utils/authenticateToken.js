
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('Authenticating token...');
  
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'No authentication token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified, decoded payload:', decoded);

    // Handle different token payload structures
    if (!decoded) {
      console.error('Invalid token payload');
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    // Set user info in request - handle both formats
    req.user = {
      id: decoded.user_id || decoded.id || null,
      email: decoded.email || null
    };

    if (!req.user.id) {
      console.error('Token missing user ID:', decoded);
      return res.status(403).json({ error: 'Invalid token payload: missing user ID' });
    }
    
    console.log('User authenticated:', req.user);
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(403).json({ error: `Invalid authentication token: ${error.message}` });
  }
};

module.exports = authenticateToken;
