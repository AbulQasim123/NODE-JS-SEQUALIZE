const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // allow only image files
        const ext = path.extname(file.originalname).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 }
});

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);

module.exports = router;
