const logger = require('../config/logger'); // Import your logger
const { verifyToken } = require('../utils/jwtHelpers');

exports.protect = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    logger.warn('Unauthorized access attempt detected: No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);
    logger.info(`Decoded token for user ID: ${decoded.id}`);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(`Token verification failed: ${err.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.restrictToAdmin = (req, res, next) => {
  if (!req.user) {
    logger.warn('Unauthorized: req.user is undefined');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if ('role' in req.user && req.user.role === 'admin') {
    logger.info(`Access granted for admin with user ID: ${req.user.id}`);
    next();
  } else {
    logger.warn(
      `Forbidden: Role is either missing or not admin. Current role for user ID ${req.user.id}: ${req.user.role}`
    );
    return res.status(403).json({ message: 'Forbidden' });
  }
};
