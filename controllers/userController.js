const { User, Profile, Role, Post } = require('../models');
const bcrypt = require('bcryptjs');

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Profile, as: 'profile' },
                { model: Role, as: 'roles', through: { attributes: [] } },
                { model: Post, as: 'posts' }
            ]
        });
        res.status(200).json({ status: true, data: user });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const payload = {};
        const { name, email, password } = req.body;
        if (name) payload.name = name;
        if (email) payload.email = email;
        if (password) payload.password = await bcrypt.hash(password, 10);

        await req.user.update(payload);
        res.json({ status: true, message: 'User updated', user: { id: req.user.id, name: req.user.name, email: req.user.email } });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Update failed', error: err.message });
    }
};

module.exports = { getMyProfile, updateUser };
