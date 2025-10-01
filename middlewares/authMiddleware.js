const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ status: false, message: 'Missing authorization header' });

    const token = header.split(' ')[1];
    if (!token) return res.status(401).json({ status: false, message: 'Invalid authorization format' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(payload.id);
        if (!user) return res.status(401).json({ status: false, message: 'User not found' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ status: false, message: 'Invalid or expired token', error: err.message });
    }
};

module.exports = { authenticate };
