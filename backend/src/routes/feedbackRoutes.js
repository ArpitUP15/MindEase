const { Router } = require('express');
const { body } = require('express-validator');

const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = Router();

router.use(auth);

router.get('/', feedbackController.listFeedback);

router.post(
  '/',
  validate([
    body('sessionId').isMongoId().withMessage('sessionId must be a valid session id'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('rating must be an integer between 1 and 5'),
    body('comments').optional().isString().withMessage('comments must be a string'),
  ]),
  feedbackController.createFeedback
);

module.exports = router;

