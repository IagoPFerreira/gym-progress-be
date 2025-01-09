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
import { createMuscle, createProfile } from '../fixtures/dataCreate';
import {
	muscle1,
	expectedMuscleUpdated,
	muscle2,
	muscle3,
} from '../dummies/muscle';
import { Muscle } from '../../src/models';

const {
	exercises: { InvalidMuscleName },
	name: { NameLength, NameRequired },
	id: { IdInvalid, IdRequired },
} = ErrorMessages;

chai.use(chaiHttp);

const endpoint = '/muscle';

describe('Muscle Integration', () => {
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
		describe('When creating an muscle', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				response = await chai
					.request(app)
					.post(`${endpoint}`)
					.set('Authorization', adminToken.body.token)
					.send(muscle1);
			});

			after(async () => {
				Muscle.destroy({ where: { id: response.body.id } });
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
					...muscle1,
					id: 1,
				});
			});
		});

		describe('When getting all muscle', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				await createMuscle(muscle1);
				await createMuscle(muscle2);

				response = await chai
					.request(app)
					.get(`${endpoint}`)
					.set('Authorization', adminToken.body.token);
			});

			after(async () => {
				await Muscle.destroy({ where: {} });
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});

			it('should return an array with all properties', async () => {
				expect(response.body).to.be.an('array');
				expect(response.body).to.have.lengthOf(2);
			});

			it('should return an array with all infos from first muscle', async () => {
				const { createdAt, updatedAt, ...rest } = response.body[0];
				expect(rest).to.be.deep.equal({
					...muscle1,
					id: 2,
				});
			});
		});

		describe('When getting an muscle by id', () => {
			let response: ChaiHttp.Response;

			before(async () => {
				const muscle = await createMuscle(muscle1);

				response = await chai
					.request(app)
					.get(`${endpoint}/${muscle.id}`)
					.set('Authorization', adminToken.body.token);
			});

			after(async () => {
				await Muscle.destroy({ where: {} });
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
					...muscle1,
					id: 4,
				});
			});
		});

		describe('When updating an muscle', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				const muscle = await Muscle.create(muscle3);

				response = await chai
					.request(app)
					.put(`${endpoint}/${muscle.id}`)
					.set('Authorization', adminToken.body.token)
					.send(muscle2);
			});

			after(async () => {
				await Muscle.destroy({ where: {} });
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
					...expectedMuscleUpdated,
					id: 5,
				});
			});
		});

		describe('When deleting an muscle', () => {
			let response: ChaiHttp.Response;

			before(async () => {
				const muscle = await Muscle.create(muscle3);

				response = await chai
					.request(app)
					.delete(`${endpoint}/${muscle.id}`)
					.set('Authorization', adminToken.body.token);
			});
			it('should return a status "204"', () => {
				expect(response.status).to.be.equal(204);
			});
			it('should return a object with name muscle', () => {
				expect(response.body).to.be.empty;
			});
		});
	});

	describe('Failure cases', () => {
		describe('When creating an muscle', () => {
			describe('without muscle name', () => {
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

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${InvalidMuscleName}`, () => {
					expect(response.body).to.have.property('error', InvalidMuscleName);
				});
			});

			describe('with invalid muscle name', () => {
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

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameLength}`, () => {
					expect(response.body).to.have.property('error', NameLength);
				});
			});
		});

		describe('When getting all muscle', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				sinon.stub(Muscle, 'findAll').rejects('ConnectionError');
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

			it('should return a object with error muscle', () => {
				expect(response.body).to.have.property('error');
			});

			it(`should return the error message: ${ErrorTypes.ObjectNotFound}`, () => {
				expect(response.body).to.have.property('error', 'internal error');
			});
		});

		describe('When getting an muscle by id', () => {
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

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const muscle = await createMuscle(muscle1);

					sinon.stub(Muscle, 'findByPk').rejects('ConnectionError');
					response = await chai
						.request(app)
						.get(`${endpoint}/${muscle.id}`)
						.set('Authorization', adminToken.body.token);
				});

				after(() => {
					sinon.restore();
					Muscle.destroy({ where: {} });
				});

				it('should return a status "404"', () => {
					expect(response.status).to.be.equal(404);
				});

				it('should return a object with error muscle', () => {
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

		describe('When updating an muscle', () => {
			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.put(`${endpoint}/0`)
						.set('Authorization', adminToken.body.token)
						.send(muscle2);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('with invalid data', () => {
				let response: ChaiHttp.Response;
				let muscle: any;

				before(async () => {
					const muscle = await createMuscle(muscle1);

					response = await chai
						.request(app)
						.put(`${endpoint}/${muscle.id}`)
						.set('Authorization', adminToken.body.token)
						.send({
							name: 'i',
						});
				});

				after(() => {
					Muscle.destroy({ where: {} });
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameLength}`, () => {
					expect(response.body).to.have.property('error', NameLength);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const muscle = await createMuscle(muscle1);

					sinon.stub(Muscle, 'update').rejects('ConnectionError');

					response = await chai
						.request(app)
						.put(`${endpoint}/${muscle.id}`)
						.set('Authorization', adminToken.body.token)
						.send({
							...muscle2,
						});
				});

				after(async () => {
					sinon.restore();
					await Muscle.destroy({ where: {} });
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error');
				});
			});
		});

		describe('When deleting an muscle', () => {
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

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const muscle = await createMuscle(muscle3);

					sinon.stub(Muscle, 'destroy').rejects('ConnectionError');

					response = await chai
						.request(app)
						.delete(`${endpoint}/${muscle.id}`)
						.set('Authorization', adminToken.body.token);
				});

				after(async () => {
					sinon.restore();
					await Muscle.destroy({ where: {} });
				});

				it('should return a status "500"', () => {
					expect(response.status).to.be.equal(500);
				});

				it('should return a object with error muscle', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error', 'internal error');
				});
			});
		});
	});
});
