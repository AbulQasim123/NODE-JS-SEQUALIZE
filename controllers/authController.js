const bcrypt = require('bcryptjs');
const { User, Profile, Role } = require('../models');
const { generateToken } = require('../utils/token');

const { registerSchema, loginSchema } = require('../validation/validateRequest');
const formatValidationErrors = (joiError) => {
    const errors = {};
    joiError.details.forEach((err) => {
        const field = err.path[0];
        if (!errors[field]) {
            errors[field] = err.message;
        }
    });
    return errors;
};

const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                status: false,
                message: 'Validation error',
                errors: formatValidationErrors(error)
            });
        }


        const { name, email, password, bio } = req.body;
        const avatarUrl = req.file ? req.file.filename : null;
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(409).json({ status: false, message: 'Email already used' });

        const hashed = await bcrypt.hash(password, 10);
        const now = new Date();

        const user = await User.create({ name, email, password: hashed, registeredAt: now });
        await Profile.create({ bio: bio || null, avatarUrl: avatarUrl || null, userId: user.id, registeredAt: now });

        const defaultRole = await Role.findOne({ where: { name: 'admin' } });
        if (defaultRole) await user.addRole(defaultRole);
        return res.status(201).json({ status: true, msg: 'User created successfully. Please login' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                status: false,
                message: 'Validation error',
                errors: formatValidationErrors(error)
            });
        }
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ status: false, message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ status: false, message: 'Invalid credentials' });

        const token = generateToken({ id: user.id, email: user.email });
        return res.json({ status: true, token, data: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

module.exports = { register, login };
