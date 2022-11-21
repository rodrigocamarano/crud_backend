import supertest, { Response } from 'supertest';
import server from '../../src/server';
import knex from '../../src/services/data/knex';
import { invalid_types, missing_variables, success } from '../json/category.json';

describe('KNEX', () => {
  describe('Category table', () => {
    const table = 'category';
    describe('Validate', () => {
      describe('Indalid types', () => {
        it('Insert', (done) => {
          supertest(server)
            .post(`/knex/${table}`)
            .send(invalid_types.insert)
            .expect(400)
            .then((response: Response) => {
              expect(typeof response.body.error.validate.description).toBe('string');
              expect(response.body.error.validate.description).toEqual('description must be an string.');
              done();
            });
        });
        it('Select by code', (done) => {
          supertest(server)
            .get(`/knex/${table}/${invalid_types.select.id}`)
            .expect(400)
            .then((response: Response) => {
              expect(typeof response.body.error.validate.id).toBe('string');
              expect(response.body.error.validate.id).toEqual('id must be an integer.');
              done();
            });
        });
        it('Update', (done) => {
          supertest(server)
            .put(`/knex/${table}`)
            .send(invalid_types.update)
            .expect(400)
            .then((response: Response) => {
              expect(typeof response.body.error.validate.id).toBe('string');
              expect(response.body.error.validate.id).toEqual('id must be an integer.');
              expect(typeof response.body.error.validate.description).toBe('string');
              expect(response.body.error.validate.description).toEqual('description must be an string.');
              done();
            });
        });
        it('Delete', (done) => {
          supertest(server)
            .delete(`/knex/${table}/${invalid_types.delete.id}`)
            .expect(400)
            .then((response: Response) => {
              expect(typeof response.body.error.validate.id).toBe('string');
              expect(response.body.error.validate.id).toEqual('id must be an integer.');
              done();
            });
        });
      });
      describe('Missing variables', () => {
        it('Update', (done) => {
          supertest(server)
            .put(`/knex/${table}`)
            .send(missing_variables.update)
            .expect(400)
            .then((response: Response) => {
              expect(typeof response.body.error.message).toBe('string');
              expect(response.body.error.message).toEqual("'category' table only allow 'id, description' in body.");
              done();
            });
        });
      });
    });
    describe('Success success', () => {
      beforeAll(async () => {
        await knex.truncate(table);
        await knex.raw(`ALTER TABLE ${table} AUTO_INCREMENT = 1 ;`);
      });
      it('Insert', (done) => {
        supertest(server)
          .post(`/knex/${table}`)
          .send(success.insert)
          .expect(201)
          .then((response: Response) => {
            expect(typeof response.body[0]).toBe('number');
            expect(response.body[0]).toEqual(1);
            done();
          });
      });
      it('Duplicate entry', (done) => {
        supertest(server)
          .post(`/knex/${table}`)
          .send(success.insert)
          .expect(409)
          .then((response: Response) => {
            console.log(response.body.error);
            expect(typeof response.body.error).toBe('string');
            expect(response.body.error).toEqual("Duplicate entry for key 'Description'");
            done();
          });
      });
      it('Select all', (done) => {
        supertest(server)
          .get(`/knex/${table}`)
          .expect(200)
          .then((response: Response) => {
            expect(Array.isArray(response.body)).toBe(true);
            done();
          });
      });
      it('Select by code', (done) => {
        supertest(server)
          .get(`/knex/${table}/${success.select.id}`)
          .expect(200)
          .then((response: Response) => {
            expect(Array.isArray(response.body)).toBe(true);
            done();
          });
      });
      it('Update', (done) => {
        supertest(server)
          .put(`/knex/${table}`)
          .send(success.update)
          .expect(200)
          .then((response: Response) => {
            expect(typeof response.body).toBe('number');
            expect(response.body).toEqual(1);
            done();
          });
      });
      it('Delete', (done) => {
        supertest(server)
          .delete(`/knex/${table}/${success.delete.id}`)
          .expect(200)
          .then((response: Response) => {
            expect(typeof response.body).toBe('number');
            expect(response.body).toEqual(1);
            done();
          });
      });
    });
  });
});
