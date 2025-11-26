const Session = require('../models/Session');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const populateUser = 'username email isCounselor createdAt updatedAt';

exports.listSessions = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.student) {
    filter.student = req.query.student;
  }

  if (req.query.counselor) {
    filter.counselor = req.query.counselor;
  }

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const sessions = await Session.find(filter)
    .sort({ scheduledTime: 1 })
    .populate('student', populateUser)
    .populate('counselor', populateUser);

  res.json({ data: sessions });
});

exports.createSession = asyncHandler(async (req, res) => {
  const { studentId, counselorId, scheduledTime, status } = req.body;

  const participants = await User.find({ _id: { $in: [studentId, counselorId] } });

  if (participants.length !== 2) {
    throw new ApiError(400, 'Both student and counselor must be valid users');
  }

  const session = await Session.create({
    student: studentId,
    counselor: counselorId,
    scheduledTime,
    status,
  });

  const populated = await session.populate([
    { path: 'student', select: populateUser },
    { path: 'counselor', select: populateUser },
  ]);

  res.status(201).json({ data: populated });
});

exports.getSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id)
    .populate('student', populateUser)
    .populate('counselor', populateUser);

  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  res.json({ data: session });
});

exports.updateSession = asyncHandler(async (req, res) => {
  const { scheduledTime, status } = req.body;

  const session = await Session.findById(req.params.id);

  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  if (scheduledTime !== undefined) {
    session.scheduledTime = scheduledTime;
  }

  if (status !== undefined) {
    session.status = status;
  }

  await session.save();

  const populated = await session.populate([
    { path: 'student', select: populateUser },
    { path: 'counselor', select: populateUser },
  ]);

  res.json({ data: populated });
});

exports.deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findByIdAndDelete(req.params.id);

  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  res.status(204).send();
});

