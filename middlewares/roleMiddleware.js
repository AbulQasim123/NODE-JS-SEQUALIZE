const { User, Role } = require('../models');

const authorize = (requiredRoles = []) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId, {
                include: {
                    model: Role,
                    as: 'roles',
                    attributes: ['name']
                }
            });

            if (!user) {
                return res.status(401).json({ status: false, message: 'User not found' });
            }

            const userRoles = user.roles.map(r => r.name);

            // check if user has at least one of the required roles
            const hasRole = requiredRoles.some(role => userRoles.includes(role));
            if (!hasRole) {
                return res.status(403).json({ status: false, message: 'Forbidden: insufficient permissions' });
            }

            next();
        } catch (err) {
            console.error('Authorization error:', err);
            return res.status(500).json({ status: false, message: 'Server error', error: err.message });
        }
    };
};

module.exports = { authorize };
