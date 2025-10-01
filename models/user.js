const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        registeredAt: { type: DataTypes.DATE, allowNull: false }
    }, {
        timestamps: true,
        paranoid: true
    });

    return User;
};