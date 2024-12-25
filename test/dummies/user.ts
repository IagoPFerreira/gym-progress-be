export const admin = {
	name: 'Admin dos Admins',
	email: 'admin@example.com',
	password: 'sup3rAdm!n',
	role: 'admin',
};

export const adminToCreate = {
	...admin,
	password: '$2a$12$4k/4hulz5cQh/l0uOv7WzeeiaRKg2M2afL2LiOV1tvns62yiFTsP6',
};

export const moderador = {
	name: 'Frodo Baggins',
	email: 'frodo@shire.com',
	password: 'on3R1ng()',
	role: 'moderador',
};

export const moderadorToCreate = {
	...moderador,
	password: '$2a$12$ycOJACJzpfVdOF92nqNMiO2uEY4bTIzkB3VlKt7kjSd0EexzHkgxG',
};

export const user = {
	name: 'Daenerys Targaryen',
	email: 'daenerys@got.com',
	password: 'Dr@g0nQu33n@F1re',
	role: 'usuário',
};

export const userToCreate = {
	...user,
	password: '$2a$12$FV/CGw6VdWUnJv42hbdKneg2rgoug1IcxysHpyLBWNmkGR/yx8zCq',
};

export const userProfile1 = {
	name: 'Yarpen Zigrin',
	email: 'yarpenzigrin@anao.com',
	password: 'an@oV3rmelho',
	role: 'usuário',
};

export const userProfileToCreate1 = {
	...userProfile1,
	password: '$2a$12$B4NQ0Bo5C4.JEEtSyjX4a.kSlJaUTETfY6Mv5.9GdfYgqhzfRqL2q',
};

export const userProfile2 = {
	name: 'Gerald de Rívia',
	email: 'bruxeiro.geraldao@kaermorhen.com',
	password: 'Y3nnefer!',
	role: 'usuário',
};

export const userProfileToCreate2 = {
	...userProfile2,
	password: '$2a$12$qc3X5BxSV/KQmBO/tVNJm.bMFn8wR7B3r20dlllH6Xx75BciK.M0O',
};

export const { password, ...userProfile1WithoutPassword } = userProfile1;

export const { password: _, ...userProfile2WithoutPassword } = userProfile2;

export const userIdentity1 = {
	...userProfile1,
	id: '2',
	cpfOrCnpj: '529.982.247-25',
	phone: '(12)34567-8900',
	address: 'Mahakan',
};

export const userIdentity2 = {
	...userProfile2,
	id: '3',
	cpfOrCnpj: '76.702.537/0001-65',
	phone: '(10)98765-4321',
	address: 'Kaer Morhen',
};

export const userProfileCreated1 = {
	...userProfile1,
	id: 2,
	updatedAt: '2024-05-16T18:47:13.814Z',
	createdAt: '2024-05-16T18:47:13.814Z',
};

export const userProfileCreated2 = {
	...userProfile2,
	id: 3,
	updatedAt: '2024-05-16T18:47:13.814Z',
	createdAt: '2024-05-16T18:47:13.814Z',
};

export const allUserProfilesCreated = [
	userProfileCreated1,
	userProfileCreated2,
];

const { password: __, ...userProfileCreated1WithoutPassword } =
	userProfileCreated1;
const { password: ___, ...userProfileCreated2WithoutPassword } =
	userProfileCreated2;

export const allUserProfilesCreatedWithoutPassword = [
	userProfileCreated1WithoutPassword,
	userProfileCreated2WithoutPassword,
];

export const userProfileToUpdated1 = {
	name: 'Yarpen Zigrin',
	email: 'yarpenozigrin@anao.com',
	password: 'an@oV3rmelho',
	role: 'usuário',
	id: 2,
	updatedAt: '2024-05-16T18:47:13.814Z',
	createdAt: '2024-05-16T18:47:13.814Z',
};

export const userProfileCreatedModel1 = {
	dataValues: {
		id: 2,
		name: 'Yarpen Zigrin',
		email: 'yarpenzigrin@anao.com',
		password: 'an@oV3rmelho',
		updatedAt: '2024-05-16T18:47:13.814Z',
		createdAt: '2024-05-16T18:47:13.814Z',
	},
	_previousDataValues: {
		name: 'Yarpen Zigrin',
		email: 'yarpenzigrin@anao.com',
		password: 'an@oV3rmelho',
		id: 2,
		createdAt: '2024-05-16T18:47:13.814Z',
		updatedAt: '2024-05-16T18:47:13.814Z',
	},
	_options: {
		isNewRecord: true,
		_schema: null,
		_schemaDelimiter: '',
		attributes: undefined,
		include: undefined,
		raw: undefined,
		silent: undefined,
	},
	isNewRecord: false,
};

export const allUserIdentities = [
	{
		id: 1,
		cpfOrCnpj: userIdentity1.cpfOrCnpj,
		phone: userIdentity1.phone,
		user: {
			id: 2,
			name: userProfile1.name,
			email: userProfile1.email,
			role: userProfile1.role,
		},
	},
	{
		id: 2,
		cpfOrCnpj: userIdentity2.cpfOrCnpj,
		phone: userIdentity2.phone,
		user: {
			id: 3,
			name: userProfile2.name,
			email: userProfile2.email,
			role: userProfile2.role,
		},
	},
];
