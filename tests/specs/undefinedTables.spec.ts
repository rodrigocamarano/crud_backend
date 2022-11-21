import supertest, { Response } from 'supertest';
import server from '../../src/server';

describe('KNEX', () => {
  describe('Invalid', () => {
    const table = 'invalid';
    it('Invalid table', (done) => {
      supertest(server)
        .get(`/knex/${table}`)
        .expect(404)
        .then((response: Response) => {
          expect(typeof response.body.error.message).toBe('string');
          expect(response.body.error.message).toEqual("Table 'invalid' not found.");
          done();
        });
    });
  });
});
