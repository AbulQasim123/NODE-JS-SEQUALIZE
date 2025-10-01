'use strict';

export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Users', {
		id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false },
		email: { type: Sequelize.STRING, allowNull: false, unique: true },
		password: { type: Sequelize.STRING, allowNull: false },
		registeredAt: { type: Sequelize.DATE, allowNull: false },
		createdAt: { type: Sequelize.DATE, allowNull: false },
		updatedAt: { type: Sequelize.DATE, allowNull: false },
		deletedAt: { type: Sequelize.DATE }
	});
}

export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Users');
}
