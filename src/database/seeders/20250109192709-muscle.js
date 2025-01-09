'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Muscles',
			[
				{
					name: 'Bíceps braquial',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Bíceps femoral',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Braquial',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Deltoide',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Eretor da espinha',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Gastrocnêmio',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Glúteo máximo',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Glúteo médio',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Glúteo mínimo',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Latíssimo do dorso',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Oblíquo externo',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Oblíquo interno',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Peitoral maior',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Peitoral menor',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Quadríceps',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Reto abdominal',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Rombóides',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Semimembranoso',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Semitendíneo',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Sóleo',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Trapézio',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Transverso do abdômen',
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
