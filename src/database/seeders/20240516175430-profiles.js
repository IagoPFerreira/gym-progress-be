'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Profiles',
			[
				{
					name: 'Alice Vardenfell',
					email: 'alice.usuario@exemplo.com',
					password:
						'$2a$12$lVfvpp61.sq7fuUDEOMPYuRlrwA/rJQDjTp7Gb3yFgx2PdJ9wVBZG',
					// Senh@123
					role: 'usuário',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Carlos Oliveira',
					email: 'admin@example.com',
					password:
						'$2a$12$2vZBb38k7zgxccfrjCppGeZZ4On1KZ3EqsaejPl88liVc.7Qp42E6',
					// Senh@456
					role: 'admin',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Fernanda Souza',
					email: 'fernanda.moderador@example.com',
					password:
						'$2a$12$7rfFDTpue8GFXNyLKIETOuLAPo19d6MK.Wv2PT/BNeast9CFogSe6',
					// Senh@789
					role: 'moderador',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{
					name: 'Gustavo Santos',
					email: 'gustavo.usuario@example.com',
					password:
						'$2a$12$gUUe9AFefp1OcGkTtzVAyOyHqoe5s99FHaftWVvfZte1p13IGFBRy',
					// Senh@ab1
					role: 'usuário',
					created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
					updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Profiles', null, {});
	},
};
