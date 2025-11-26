const jwt = require('jsonwebtoken');

const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const buildToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  return jwt.sign(
    {
      sub: userId,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

const respondWithAuth = (res, user, statusCode = 200) => {
  const token = buildToken(user._id.toString());
  res.status(statusCode).json({
    token,
    user: user.toJSON(),
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, isCounselor } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, 'A user with the same email or username already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
    isCounselor: Boolean(isCounselor),
  });

  respondWithAuth(res, user, 201);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid email or password');
  }

  respondWithAuth(res, user);
});

exports.getProfile = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toJSON() });
});

