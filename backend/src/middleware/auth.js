const jwt = require('jsonwebtoken');

const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const auth = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication credentials were not provided');
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  let decoded;

  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired authentication token');
  }

  const user = await User.findById(decoded.sub);

  if (!user) {
    throw new ApiError(401, 'User associated with token no longer exists');
  }

  req.user = user;
  next();
});

module.exports = auth;

