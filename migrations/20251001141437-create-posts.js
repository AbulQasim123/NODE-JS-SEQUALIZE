'use strict';

export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Posts', {
		id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		title: { type: Sequelize.STRING, allowNull: false },
		body: { type: Sequelize.TEXT, allowNull: false },
		userId: {
			type: Sequelize.INTEGER.UNSIGNED,
			allowNull: false,
			references: { model: 'Users', key: 'id' },
			onDelete: 'CASCADE'
		},
		createdAt: { type: Sequelize.DATE, allowNull: false },
		updatedAt: { type: Sequelize.DATE, allowNull: false }
	});
}

export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Posts');
}
