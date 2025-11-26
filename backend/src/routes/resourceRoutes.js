const { Router } = require('express');
const { body, param } = require('express-validator');

const resourceController = require('../controllers/resourceController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = Router();

router.use(auth);

router.get('/', resourceController.listResources);

router.post(
  '/',
  validate([
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('url').optional().isURL().withMessage('url must be a valid URL'),
  ]),
  resourceController.createResource
);

router.patch(
  '/:id',
  validate([
    param('id').isMongoId().withMessage('id must be a valid resource id'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('url').optional().isURL().withMessage('url must be a valid URL'),
  ]),
  resourceController.updateResource
);

router.delete(
  '/:id',
  validate([param('id').isMongoId().withMessage('id must be a valid resource id')]),
  resourceController.deleteResource
);

module.exports = router;

