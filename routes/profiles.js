const router = require('express').Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { updateProfile } = require('../controllers/profileController');

router.put('/me', authenticate, updateProfile);

module.exports = router;
