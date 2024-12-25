import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;
import app from '../../src/app';
import {
	admin,
	adminToCreate,
	userProfile1,
	userProfile2,
	userProfileToCreate2,
} from '../dummies/user';
import connectToDatabase from '../../src/database';
import {
	ErrorMessages,
	ErrorTypes,
	errorCatalog,
} from '../../src/errors/catalog';
import sinon from 'sinon';
import { Profile } from '../../src/models';

chai.use(chaiHttp);

const endpoint = '/profile';

describe('User Profile Integration', () => {
	let userToken1: any;
	let adminToken: any;
	before(async () => {
		await connectToDatabase.sync({ force: true });
		await Profile.create(adminToCreate);

		await chai.request(app).post(endpoint).send(userProfile1);
		adminToken = await chai.request(app).post('/login').send(admin);
		userToken1 = await chai.request(app).post('/login').send(userProfile1);
	});
	after(() => {
		sinon.restore();
		connectToDatabase.drop();
	});

	describe('Success cases', () => {
		describe('When creating a user', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				response = await chai.request(app).post(endpoint).send(userProfile2);
			});

			after(async () => {
				await Profile.destroy({ where: { id: response.body.id } });
			});

			it('should return a status "201"', () => {
				expect(response.status).to.be.equal(201);
			});
			it('should return a object with name property', () => {
				expect(response.body).to.have.property('name', 'Gerald de Rívia');
			});
			it('should return a object with email property', () => {
				expect(response.body).to.have.property(
					'email',
					'bruxeiro.geraldao@kaermorhen.com'
				);
			});
			it('should return a object without password property', () => {
				expect(response.body).not.to.have.property('password');
			});
			it('should return a object with id property', () => {
				expect(response.body).to.have.property('id', 3);
			});
		});

		describe('When getting all users', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				response = await chai
					.request(app)
					.get(endpoint)
					.set('Authorization', adminToken.body.token);
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});

			it('should return an array with all users', async () => {
				expect(response.body).to.be.an('array');
				expect(response.body).to.have.lengthOf(2);
			});

			it('should return an array with all users without password', async () => {
				expect(response.body).to.be.an('array');
				expect(response.body).to.have.lengthOf(2);
				expect(response.body[0]).to.have.property('name', admin.name);
				expect(response.body[0]).to.have.property('email', admin.email);
				expect(response.body[0]).to.have.property('id', 1);
				expect(response.body[0]).not.to.have.property('password');
				expect(response.body[1]).to.have.property('name', userProfile1.name);
				expect(response.body[1]).to.have.property('email', userProfile1.email);
				expect(response.body[1]).to.have.property('id', 2);
				expect(response.body[1]).not.to.have.property('password');
			});
		});

		describe('When getting a user by id', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				response = await chai
					.request(app)
					.get(`${endpoint}/2`)
					.set('Authorization', userToken1.body.token);
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});
			it('should return a object with name property', () => {
				expect(response.body).to.have.property('name', 'Yarpen Zigrin');
			});
			it('should return a object with email property', () => {
				expect(response.body).to.have.property(
					'email',
					'yarpenzigrin@anao.com'
				);
			});
			it('should return a object with password property', () => {
				expect(response.body).not.to.have.property('password');
			});
			it('should return a object with id property', () => {
				expect(response.body).to.have.property('id', 2);
			});
		});

		describe('When updating a user', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				response = await chai
					.request(app)
					.put(`${endpoint}/2`)
					.set('Authorization', userToken1.body.token)
					.send({
						...userProfile1,
						email: 'yarpenozigrin@anao.com',
					});
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});
			it('should return a object with name property', () => {
				expect(response.body).to.have.property('name', 'Yarpen Zigrin');
			});
			it('should return a object with email property', () => {
				expect(response.body).to.have.property(
					'email',
					'yarpenozigrin@anao.com'
				);
			});
			it('should return a object with password property', () => {
				expect(response.body).not.to.have.property('password');
			});
			it('should return a object with id property', () => {
				expect(response.body).to.have.property('id', 2);
			});
		});

		describe('When deleting a user', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				const newUser = await Profile.create(userProfileToCreate2);
				const userToken = await chai
					.request(app)
					.post('/login')
					.send(userProfile2);

				response = await chai
					.request(app)
					.delete(`${endpoint}/${newUser.id}`)
					.set('Authorization', userToken.body.token);
			});
			it('should return a status "204"', () => {
				expect(response.status).to.be.equal(204);
			});
			it('should return a object with name property', () => {
				expect(response.body).to.be.empty;
			});
		});
	});

	describe('Failure cases', () => {
		describe('When creating a user', () => {
			after(() => {
				sinon.restore();
			});
			describe('without e-email', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(endpoint)

						.send({
							...userProfile1,
							email: '',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.user.EmailRequired}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.user.EmailRequired
					);
				});
			});

			describe('with invalid e-email', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(endpoint)
						.send({
							...userProfile1,
							email: 'invalid-email',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.user.EmailInvalid}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.user.EmailInvalid
					);
				});
			});

			describe('without name', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(endpoint)
						.send({
							...userProfile1,
							name: '',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.user.NameRequired}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.user.NameRequired
					);
				});
			});

			describe('with invalid name', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(endpoint)
						.send({
							...userProfile1,
							name: 'in',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.user.NameLength}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.user.NameLength
					);
				});
			});

			describe('without password', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(endpoint)
						.send({
							...userProfile1,
							password: '',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.user.PasswordRequired}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.user.PasswordRequired
					);
				});
			});

			describe('with a password shorter than 8 characters', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(endpoint)
						.send({
							...userProfile1,
							password: '1234567',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.user.PasswordLength}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.user.PasswordLength
					);
				});
			});

			describe('with invalid password', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(endpoint)
						.send({
							...userProfile1,
							password: 'Abcd1234',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.user.PasswordInvalid}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.user.PasswordInvalid
					);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					sinon.stub(Profile, 'findOne').resolves(null);
					sinon.stub(Profile, 'create').rejects('ConnectionError');
					response = await chai.request(app).post(endpoint).send(userProfile2);
				});

				after(async () => {
					sinon.restore();
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(500);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error');
				});
			});
		});

		describe('When getting all users', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				sinon.stub(Profile, 'findAll').rejects('ConnectionError');
				response = await chai
					.request(app)
					.get(endpoint)
					.set('Authorization', adminToken.body.token);
			});

			after(() => {
				sinon.restore();
			});

			it('should return a status "500"', () => {
				expect(response.status).to.be.equal(500);
			});

			it('should return a object with error property', () => {
				expect(response.body).to.have.property('error');
			});

			it(`should return the error message: 'internal error'`, () => {
				expect(response.body).to.have.property('error', 'internal error');
			});
		});

		describe('When getting a user by id', () => {
			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.get(`${endpoint}/0`)
						.set('Authorization', userToken1.body.token);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.id.IdInvalid}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.id.IdInvalid
					);
				});
			});
		});

		describe('When updating a user', () => {
			let userToken: any;
			let user: any;
			before(async () => {
				user = await Profile.create(userProfileToCreate2);

				userToken = await chai.request(app).post('/login').send(userProfile2);
			});

			after(async () => {
				await Profile.destroy({ where: { id: user.id } });
			});

			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.put(`${endpoint}/0`)
						.set('Authorization', userToken.body.token)
						.send(userProfile1);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.id.IdInvalid}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.id.IdInvalid
					);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					sinon.stub(Profile, 'update').rejects('ConnectionError');
					response = await chai
						.request(app)
						.put(`${endpoint}/${user.id}`)
						.set('Authorization', userToken.body.token)
						.send(userProfile1);
				});

				after(() => {
					sinon.restore();
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error');
				});
			});
		});

		describe('When deleting a user', () => {
			let userToken: any;
			let user: any;
			before(async () => {
				user = await Profile.create(userProfileToCreate2);

				userToken = await chai.request(app).post('/login').send(userProfile2);
			});

			after(async () => {
				await Profile.destroy({ where: { id: user.id } });
			});

			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				let userToken: any;
				before(async () => {
					userToken = await chai.request(app).post('/login').send(userProfile2);
					response = await chai
						.request(app)
						.delete(`${endpoint}/0`)
						.set('Authorization', userToken.body.token);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorMessages.id.IdInvalid}`, () => {
					expect(response.body).to.have.property(
						'error',
						ErrorMessages.id.IdInvalid
					);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					sinon.stub(Profile, 'destroy').rejects('ConnectionError');
					response = await chai
						.request(app)
						.delete(`${endpoint}/${user.id}`)
						.set('Authorization', userToken.body.token);
				});

				after(() => {
					sinon.restore();
				});

				it('should return a status "500"', () => {
					expect(response.status).to.be.equal(500);
				});

				it('should return a object with error property', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: 'internal error'`, () => {
					expect(response.body).to.have.property('error', 'internal error');
				});
			});
		});
	});
});
