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
import { createMachine, createProfile } from '../fixtures/dataCreate';
import {
	machine1,
	expectedMachineUpdated,
	machine2,
	machine3,
} from '../dummies/machine';
import { Machine } from '../../src/models';

const {
	name: { NameLength, NameRequired },
	id: { IdInvalid, IdRequired },
} = ErrorMessages;

chai.use(chaiHttp);

const endpoint = '/machine';

describe('Machine Integration', () => {
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
		describe('When creating an machine', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				response = await chai
					.request(app)
					.post(`${endpoint}`)
					.set('Authorization', adminToken.body.token)
					.send(machine1);
			});

			after(async () => {
				Machine.destroy({ where: { id: response.body.id } });
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
					...machine1,
					id: 1,
				});
			});
		});

		describe('When getting all machine', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				await createMachine(machine1);
				await createMachine(machine2);

				response = await chai
					.request(app)
					.get(`${endpoint}`)
					.set('Authorization', adminToken.body.token);
			});

			after(async () => {
				await Machine.destroy({ where: {} });
			});

			it('should return a status "200"', () => {
				expect(response.status).to.be.equal(200);
			});

			it('should return an array with all properties', async () => {
				expect(response.body).to.be.an('array');
				expect(response.body).to.have.lengthOf(2);
			});

			it('should return an array with all infos from first machine', async () => {
				const { createdAt, updatedAt, ...rest } = response.body[0];
				expect(rest).to.be.deep.equal({
					...machine1,
					id: 2,
				});
			});
		});

		describe('When getting an machine by id', () => {
			let response: ChaiHttp.Response;

			before(async () => {
				const machine = await createMachine(machine1);

				response = await chai
					.request(app)
					.get(`${endpoint}/${machine.id}`)
					.set('Authorization', adminToken.body.token);
			});

			after(async () => {
				await Machine.destroy({ where: {} });
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
					...machine1,
					id: 4,
				});
			});
		});

		describe('When updating an machine', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				const machine = await Machine.create(machine3);

				response = await chai
					.request(app)
					.put(`${endpoint}/${machine.id}`)
					.set('Authorization', adminToken.body.token)
					.send(machine2);
			});

			after(async () => {
				await Machine.destroy({ where: {} });
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
					...expectedMachineUpdated,
					id: 5,
				});
			});
		});

		describe('When deleting an machine', () => {
			let response: ChaiHttp.Response;

			before(async () => {
				const machine = await Machine.create(machine3);

				response = await chai
					.request(app)
					.delete(`${endpoint}/${machine.id}`)
					.set('Authorization', adminToken.body.token);
			});
			it('should return a status "204"', () => {
				expect(response.status).to.be.equal(204);
			});
			it('should return a object with name machine', () => {
				expect(response.body).to.be.empty;
			});
		});
	});

	describe('Failure cases', () => {
		describe('When creating an machine', () => {
			describe('without machine name', () => {
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

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameRequired}`, () => {
					expect(response.body).to.have.property('error', NameRequired);
				});
			});

			describe('with invalid machine name', () => {
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

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameLength}`, () => {
					expect(response.body).to.have.property('error', NameLength);
				});
			});
		});

		describe('When getting all machine', () => {
			let response: ChaiHttp.Response;
			before(async () => {
				sinon.stub(Machine, 'findAll').rejects('ConnectionError');
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

			it('should return a object with error machine', () => {
				expect(response.body).to.have.property('error');
			});

			it(`should return the error message: ${ErrorTypes.ObjectNotFound}`, () => {
				expect(response.body).to.have.property('error', 'internal error');
			});
		});

		describe('When getting an machine by id', () => {
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

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const machine = await createMachine(machine1);

					sinon.stub(Machine, 'findByPk').rejects('ConnectionError');
					response = await chai
						.request(app)
						.get(`${endpoint}/${machine.id}`)
						.set('Authorization', adminToken.body.token);
				});

				after(() => {
					sinon.restore();
					Machine.destroy({ where: {} });
				});

				it('should return a status "404"', () => {
					expect(response.status).to.be.equal(404);
				});

				it('should return a object with error machine', () => {
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

		describe('When updating an machine', () => {
			describe('with invalid id', () => {
				let response: ChaiHttp.Response;
				before(async () => {
					response = await chai
						.request(app)
						.put(`${endpoint}/0`)
						.set('Authorization', adminToken.body.token)
						.send(machine2);
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('with invalid data', () => {
				let response: ChaiHttp.Response;
				let machine: any;

				before(async () => {
					const machine = await createMachine(machine1);

					response = await chai
						.request(app)
						.put(`${endpoint}/${machine.id}`)
						.set('Authorization', adminToken.body.token)
						.send({
							name: 'i',
						});
				});

				after(() => {
					Machine.destroy({ where: {} });
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${NameLength}`, () => {
					expect(response.body).to.have.property('error', NameLength);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const machine = await createMachine(machine1);

					sinon.stub(Machine, 'update').rejects('ConnectionError');

					response = await chai
						.request(app)
						.put(`${endpoint}/${machine.id}`)
						.set('Authorization', adminToken.body.token)
						.send({
							...machine2,
						});
				});

				after(async () => {
					sinon.restore();
					await Machine.destroy({ where: {} });
				});

				it('should return a status "400"', () => {
					expect(response.status).to.be.equal(400);
				});

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error');
				});
			});
		});

		describe('When deleting an machine', () => {
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

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${IdInvalid}`, () => {
					expect(response.body).to.have.property('error', IdInvalid);
				});
			});

			describe('generates internal error', () => {
				let response: ChaiHttp.Response;

				before(async () => {
					const machine = await createMachine(machine3);

					sinon.stub(Machine, 'destroy').rejects('ConnectionError');

					response = await chai
						.request(app)
						.delete(`${endpoint}/${machine.id}`)
						.set('Authorization', adminToken.body.token);
				});

				after(async () => {
					sinon.restore();
					await Machine.destroy({ where: {} });
				});

				it('should return a status "500"', () => {
					expect(response.status).to.be.equal(500);
				});

				it('should return a object with error machine', () => {
					expect(response.body).to.have.property('error');
				});

				it(`should return the error message: ${ErrorTypes.InvalidInfo}`, () => {
					expect(response.body).to.have.property('error', 'internal error');
				});
			});
		});
	});
});
