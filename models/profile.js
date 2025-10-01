const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Profile = sequelize.define('Profile', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        bio: { type: DataTypes.TEXT, allowNull: true },
        avatarUrl: { type: DataTypes.STRING, allowNull: true },
    });

    return Profile;
};
