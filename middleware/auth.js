const jwt = require('jsonwebtoken');
const { UnautheticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnautheticatedError('No Token Found');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
  } catch (error) {
    throw new UnautheticatedError('Not Authorized to use this route');
  }
  next();
};

module.exports = authenticationMiddleware;
