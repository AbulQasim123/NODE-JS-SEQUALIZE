const router = require('express').Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { getMyProfile, updateUser } = require('../controllers/userController');

router.get('/me', authenticate, getMyProfile);
router.put('/me', authenticate, updateUser);

module.exports = router;
