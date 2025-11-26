const { Router } = require('express');
const { body, param, query } = require('express-validator');

const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Session = require('../models/Session');

const router = Router();

router.use(auth);

router.get(
  '/',
  validate([
    query('student').optional().isMongoId().withMessage('student must be a valid user id'),
    query('counselor').optional().isMongoId().withMessage('counselor must be a valid user id'),
    query('status')
      .optional()
      .isIn(Session.SESSION_STATUS)
      .withMessage(`status must be one of: ${Session.SESSION_STATUS.join(', ')}`),
  ]),
  sessionController.listSessions
);

router.post(
  '/',
  validate([
    body('studentId').isMongoId().withMessage('studentId must be a valid user id'),
    body('counselorId').isMongoId().withMessage('counselorId must be a valid user id'),
    body('scheduledTime').isISO8601().withMessage('scheduledTime must be a valid ISO8601 date string'),
    body('status')
      .optional()
      .isIn(Session.SESSION_STATUS)
      .withMessage(`status must be one of: ${Session.SESSION_STATUS.join(', ')}`),
  ]),
  sessionController.createSession
);

router.get(
  '/:id',
  validate([param('id').isMongoId().withMessage('id must be a valid session id')]),
  sessionController.getSession
);

router.patch(
  '/:id',
  validate([
    param('id').isMongoId().withMessage('id must be a valid session id'),
    body('scheduledTime')
      .optional()
      .isISO8601()
      .withMessage('scheduledTime must be a valid ISO8601 date string'),
    body('status')
      .optional()
      .isIn(Session.SESSION_STATUS)
      .withMessage(`status must be one of: ${Session.SESSION_STATUS.join(', ')}`),
  ]),
  sessionController.updateSession
);

router.delete(
  '/:id',
  validate([param('id').isMongoId().withMessage('id must be a valid session id')]),
  sessionController.deleteSession
);

module.exports = router;

