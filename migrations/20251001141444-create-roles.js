'use strict';

export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Roles', {
		id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false, unique: true },
		createdAt: { type: Sequelize.DATE, allowNull: false },
		updatedAt: { type: Sequelize.DATE, allowNull: false }
	});
}

export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Roles');
}
