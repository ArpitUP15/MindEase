const { Router } = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = Router();

router.post(
  '/register',
  validate([
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('isCounselor').optional().isBoolean().withMessage('isCounselor must be a boolean'),
  ]),
  authController.register
);

router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  authController.login
);

router.get('/me', auth, authController.getProfile);

module.exports = router;

