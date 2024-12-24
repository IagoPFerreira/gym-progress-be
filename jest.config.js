/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/test/unit'],
	moduleDirectories: ['node_modules', 'src', 'test/mocks', 'test/dummies'],
	modulePathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/node_modules/',
		'<rootDir>/src/models/connection.ts',
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/models/connection.ts', // Ignora o arquivo específico que você mencionou
		'!src/**/*.d.ts', // Ignora arquivos de definição de tipo
	],
	coverageDirectory: '<rootDir>/coverage',
};
