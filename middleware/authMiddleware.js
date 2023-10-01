const { verifyToken } = require('../utils/jwtHelpers');

exports.protect = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);
    console.log('Decoded Token: ', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(`Token verification failed: ${err.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.restrictToAdmin = (req, res, next) => {
  console.log('req.user:', req.user); // Debug output

  if (!req.user) {
    console.error('Unauthorized: req.user is undefined');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if ('role' in req.user && req.user.role === 'admin') {
    next();
  } else {
    console.error(
      `Forbidden: Role is either missing or not admin. Current role: ${req.user.role}`
    );
    return res.status(403).json({ message: 'Forbidden' });
  }
};
