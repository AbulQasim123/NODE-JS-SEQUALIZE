'use strict';

export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('UserRoles', {
		userId: {
			type: Sequelize.INTEGER.UNSIGNED,
			references: { model: 'Users', key: 'id' },
			onDelete: 'CASCADE',
			primaryKey: true
		},
		roleId: {
			type: Sequelize.INTEGER.UNSIGNED,
			references: { model: 'Roles', key: 'id' },
			onDelete: 'CASCADE',
			primaryKey: true
		},
		createdAt: { type: Sequelize.DATE, allowNull: false },
		updatedAt: { type: Sequelize.DATE, allowNull: false }
	});
}

export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('UserRoles');
}
