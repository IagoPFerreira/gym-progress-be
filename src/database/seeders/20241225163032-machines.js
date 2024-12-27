'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Machines',
			[
				{
					name: 'Cadeira Abdutora',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Cadeira Adutora',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Cadeira Extensora',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Cadeira Flexora',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Leg Press',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Pulley',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Smith',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Supino',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Machines', null, {});
	},
};
