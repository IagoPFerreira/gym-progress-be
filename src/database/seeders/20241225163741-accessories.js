'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Accessories',
			[
				{
					name: 'Anilhas',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Banco',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},

				{
					name: 'Barra Reta',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Barra Romana',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Barra W',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Haltere',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Kettlebells',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Accessories', null, {});
	},
};
