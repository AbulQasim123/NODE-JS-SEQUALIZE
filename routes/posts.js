const router = require('express').Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const postController = require('../controllers/postController');

// Public routes (anyone can access)
router.get('/', postController.listPosts);
router.get('/:id', postController.getPost);

// Protected routes (only admin can create/update/delete)
router.post('/', authenticate, authorize(['admin']), postController.createPost);
router.put('/:id', authenticate, authorize(['admin']), postController.updatePost);
router.delete('/:id', authenticate, authorize(['admin']), postController.deletePost);

module.exports = router;
