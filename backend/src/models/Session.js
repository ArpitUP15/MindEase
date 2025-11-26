const mongoose = require('mongoose');

const SESSION_STATUS = ['pending', 'done', 'cancelled'];

const sessionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    counselor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: SESSION_STATUS,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Session', sessionSchema);
module.exports.SESSION_STATUS = SESSION_STATUS;

