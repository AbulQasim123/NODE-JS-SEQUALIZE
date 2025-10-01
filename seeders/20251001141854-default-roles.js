'use strict';

export async function up(queryInterface, Sequelize) {
	await queryInterface.bulkInsert('Roles', [
		{ name: 'user', createdAt: new Date(), updatedAt: new Date() },
		{ name: 'admin', createdAt: new Date(), updatedAt: new Date() }
	]);
}

export async function down(queryInterface, Sequelize) {
	await queryInterface.bulkDelete('Roles', null, {});
}