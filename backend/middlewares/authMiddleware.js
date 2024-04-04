// AuthMiddleware
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if the token exists in the request headers
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    
    // Set the user object in the request
    req.user = decoded.user;
    console.log(req.user);

    // Call the next middleware in the chain
    next();
  } catch (err) {
    // If there's an error with the token, return a 401 Unauthorized response
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
