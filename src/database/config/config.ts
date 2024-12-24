require('dotenv/config');

module.exports = {
	dialect: process.env.DIALECT,
	host: process.env.DB_HOST,
	database: `${process.env.DB_NAME}`,
	username: process.env.DB_USER,
	password: String(process.env.DB_PASSWORD),
	logging: false,
};
