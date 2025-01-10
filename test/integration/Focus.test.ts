import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;
import app from '../../src/app';
import { admin, adminToCreate, user } from '../dummies/user';
import connectToDatabase from '../../src/database';
import {
	ErrorMessages,
	ErrorTypes,
	errorCatalog,
} from '../../src/errors/catalog';
import sinon from 'sinon';
import { createFocus, createProfile } from '../fixtures/dataCreate';
import { focus1, expectedFocusUpdated, focus2, focus3 } from '../dummies/focus';
import { Focus } from '../../src/models';

const {
	name: { NameLength, NameRequired },
	id: { IdInvalid },
} = ErrorMessages;

chai.use(chaiHttp);

const endpoint = '/focus';

describe('Focus Integration', () => {
	let userToken: any;
	let adminToken: any;
	before(async () => {
		await connectToDatabase.sync({ force: true });
		await createProfile(adminToCreate);

		adminToken = await chai.request(app).post('/login').send(admin);
		userToken = await chai.request(app).post('/login').send(user);
	});
	after(() => {
		connectToDatabase.truncate();
		sinon.restore();
		connectToDatabase.drop();
	});

	describe('Success cases', () => {
		describe('When creating an focus', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				response = await chai
					.request(app)
					.post(`${endpoint}`)
					.set('Authorization', adminToken.body.token)
					.send(focus1);
			});

			after(async () => {
				Focus.destroy({ where: { id: response.body.id } });
			});

			it('should return a status "201"', () => {
				expect(response.status).to.be.equal(201);
			});

			it('should return a object', () => {
				expect(response.body).to.have.be.an('object');
			});

			it('should return a object with all properties', () => {
				const { createdAt, updatedAt, ...rest } = response.body;
				expect(rest).to.be.deep.equal({
					...focus1,
					id: 1,
				});
			});
		});

		describe('When getting all focus', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				await createFocus(focus1);
				await createFocus(focus2);

				response = await chai
					.request(app)
					.get(`${endpoint}`)
					.set('Authorization', adminToken.body.token);
			});

			after(async () => {
				await Focus.destroy({ where: {} });
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});

			it('should return an array with all properties', async () => {
				expect(response.body).to.be.an('array');
				expect(response.body).to.have.lengthOf(2);
			});

			it('should return an array with all infos from first focus', async () => {
				const { createdAt, updatedAt, ...rest } = response.body[0];
				expect(rest).to.be.deep.equal({
					...focus1,
					id: 2,
				});
			});
		});

		describe('When getting an focus by id', () => {
			let response: ChaiHttp.Response;

			before(async () => {
				const focus = await createFocus(focus1);

				response = await chai
					.request(app)
					.get(`${endpoint}/${focus.id}`)
					.set('Authorization', adminToken.body.token);
			});

			after(async () => {
				await Focus.destroy({ where: {} });
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});

			it('should return a object', () => {
				expect(response.body).to.have.be.an('object');
			});

			it('should return a object with all properties', () => {
				const { createdAt, updatedAt, ...rest } = response.body;
				expect(rest).to.be.deep.equal({
					...focus1,
					id: 4,
				});
			});
		});

		describe('When updating an focus', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				const focus = await Focus.create(focus3);

				response = await chai
					.request(app)
					.put(`${endpoint}/${focus.id}`)
					.set('Authorization', adminToken.body.token)
					.send(focus2);
			});

			after(async () => {
				await Focus.destroy({ where: {} });
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});
			it('should return a object', () => {
				expect(response.body).to.have.be.an('object');
			});

			it('should return a object with all properties', () => {
				const { createdAt, updatedAt, ...rest } = response.body;
				expect(rest).to.be.deep.equal({
					...expectedFocusUpdated,
					id: 5,
				});
			});
		});

		describe('When deleting an focus', () => {
			let response: ChaiHttp.Response;

			before(async () => {
				const focus = await Focus.create(focus3);

				response = await chai
					.request(app)
					.delete(`${endpoint}/${focus.id}`)
					.set('Authorization', adminToken.body.token);
			});
			it('should return a status "204"', () => {
				expect(response.status).to.be.equal(204);
			});
			it('should return a object with name focus', () => {
				expect(response.body).to.be.empty;
			});
		});
	});

	describe('Failure cases', () => {
		describe('When creating an focus', () => {
			describe('without focus name', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(`${endpoint}`)
						.set('Authorization', adminToken.body.token)
						.send({
							name: '',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameRequired}`, () => {
					expect(response.body).to.have.property('error', NameRequired);
				});
			});

			describe('with invalid focus name', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.post(`${endpoint}`)
						.set('Authorization', adminToken.body.token)
						.send({
							name: 'As',
						});
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameLength}`, () => {
					expect(response.body).to.have.property('error', NameLength);
				});
			});
		});

		describe('When getting all focus', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				sinon.stub(Focus, 'findAll').rejects('ConnectionError');
				response = await chai
					.request(app)
					.get(`${endpoint}`)
					.set('Authorization', adminToken.body.token);
			});

			after(() => {
				sinon.restore();
			});

			it('should return a status "500"', () => {
				expect(response.status).to.be.equal(500);
			});

			it('should return a object with error focus', () => {
				expect(response.body).to.have.property('error');
			});

			it(`should return the error message: ${ErrorTypes.ObjectNotFound}`, () => {
				expect(response.body).to.have.property('error', 'internal error');
			});
		});

		describe('When getting an focus by id', () => {
			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.get(`${endpoint}/0`)
						.set('Authorization', adminToken.body.token);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const focus = await createFocus(focus1);

					sinon.stub(Focus, 'findByPk').rejects('ConnectionError');
					response = await chai
						.request(app)
						.get(`${endpoint}/${focus.id}`)
						.set('Authorization', adminToken.body.token);
				});

				after(() => {
					sinon.restore();
					Focus.destroy({ where: {} });
				});

				it('should return a status "404"', () => {
					expect(response.status).to.be.equal(404);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.ObjectNotFound}`, () => {
					expect(response.body).to.have.property(
						'error',
						errorCatalog.ObjectNotFound.message
					);
				});
			});
		});

		describe('When updating an focus', () => {
			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.put(`${endpoint}/0`)
						.set('Authorization', adminToken.body.token)
						.send(focus2);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('with invalid data', () => {
				let response: ChaiHttp.Response;
				let focus: any;

				before(async () => {
					const focus = await createFocus(focus1);

					response = await chai
						.request(app)
						.put(`${endpoint}/${focus.id}`)
						.set('Authorization', adminToken.body.token)
						.send({
							name: 'i',
						});
				});

				after(() => {
					Focus.destroy({ where: {} });
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameLength}`, () => {
					expect(response.body).to.have.property('error', NameLength);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const focus = await createFocus(focus1);

					sinon.stub(Focus, 'update').rejects('ConnectionError');

					response = await chai
						.request(app)
						.put(`${endpoint}/${focus.id}`)
						.set('Authorization', adminToken.body.token)
						.send({
							...focus2,
						});
				});

				after(async () => {
					sinon.restore();
					await Focus.destroy({ where: {} });
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error');
				});
			});
		});

		describe('When deleting an focus', () => {
			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.delete(`${endpoint}/0`)
						.set('Authorization', adminToken.body.token);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const focus = await createFocus(focus3);

					sinon.stub(Focus, 'destroy').rejects('ConnectionError');

					response = await chai
						.request(app)
						.delete(`${endpoint}/${focus.id}`)
						.set('Authorization', adminToken.body.token);
				});

				after(async () => {
					sinon.restore();
					await Focus.destroy({ where: {} });
				});

				it('should return a status "500"', () => {
					expect(response.status).to.be.equal(500);
				});

				it('should return a object with error focus', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error', 'internal error');
				});
			});
		});
	});
});
