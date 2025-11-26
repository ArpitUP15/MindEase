const { Router } = require('express');

const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = Router();

router.use(auth);

router.get('/', userController.listUsers);

module.exports = router;

