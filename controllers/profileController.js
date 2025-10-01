const { Profile } = require('../models');

const updateProfile = async (req, res) => {
    try {
        const { bio, avatarUrl } = req.body;
        const profile = await Profile.findOne({ where: { userId: req.user.id } });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        await profile.update({ bio: bio ?? profile.bio, avatarUrl: avatarUrl ?? profile.avatarUrl });
        res.json({ message: 'Profile updated', profile });
    } catch (err) {
        res.status(500).json({ message: 'Update failed', error: err.message });
    }
};

module.exports = { updateProfile };
