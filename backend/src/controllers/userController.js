const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.listUsers = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.isCounselor !== undefined) {
    filter.isCounselor = req.query.isCounselor === 'true';
  }

  if (req.query.search) {
    const pattern = new RegExp(req.query.search, 'i');
    filter.$or = [{ username: pattern }, { email: pattern }];
  }

  const users = await User.find(filter)
    .select('username email isCounselor createdAt updatedAt')
    .sort({ createdAt: -1 });

  res.json({ data: users });
});

