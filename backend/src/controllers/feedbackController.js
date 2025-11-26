const Feedback = require('../models/Feedback');
const Session = require('../models/Session');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

exports.listFeedback = asyncHandler(async (_req, res) => {
  const feedback = await Feedback.find()
    .sort({ createdAt: -1 })
    .populate({
      path: 'session',
      populate: [
        { path: 'student', select: 'username email isCounselor' },
        { path: 'counselor', select: 'username email isCounselor' },
      ],
    });

  res.json({ data: feedback });
});

exports.createFeedback = asyncHandler(async (req, res) => {
  const { sessionId, rating, comments } = req.body;

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  const existing = await Feedback.findOne({ session: sessionId });

  if (existing) {
    throw new ApiError(409, 'Feedback already exists for this session');
  }

  const feedback = await Feedback.create({ session: sessionId, rating, comments });

  const populated = await feedback.populate({
    path: 'session',
    populate: [
      { path: 'student', select: 'username email isCounselor' },
      { path: 'counselor', select: 'username email isCounselor' },
    ],
  });

  res.status(201).json({ data: populated });
});

