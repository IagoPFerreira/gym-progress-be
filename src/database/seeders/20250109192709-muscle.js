'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Muscles',
			[
				{
					name: 'Peitoral',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Tríceps',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},

				{
					name: 'Bíceps',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Dorsal',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Quadríceps',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Glúteos',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Panturrilha',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Deltoide',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Muscles', null, {});
	},
};
