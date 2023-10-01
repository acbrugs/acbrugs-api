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
    req.user = verifyToken(token);
    next();
  } catch (err) {
    console.error(`Token verification failed: ${err.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.restrictToAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.error(
      `Forbidden: ${req.user.role} trying to access admin-only route`
    );
    return res.status(403).json({ message: 'Forbidden' });
  }
};
