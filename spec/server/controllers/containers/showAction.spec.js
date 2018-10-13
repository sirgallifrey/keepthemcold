const createServer = require('../../../../src/server/create-server.js');
const cleanDatabase = require('../../helpers/clean-database');

const method = 'get';
const url = (id) => `/containers/${id}`;

describe('get /containers/{id}', () => {
  let server;

  beforeEach(cleanDatabase);

  beforeEach(async () => {
    server = await createServer();
  });

  describe('when container exists', () => {
    it('returns code 200', async () => {
      const response = await server.inject({ method, url: url(1) });
      expect(response.statusCode).toBe(200);
    });

    it('returns requested container', async () => {
      const response = await server.inject({ method, url: url(2) });
      const payload = JSON.parse(response.payload);
      expect(payload).toMatchObject(
        {
          id: 2,
          label: expect.any(String),
          minTemperature: expect.any(Number),
          maxTemperature: expect.any(Number),
        }
      );
    });
  });

  describe('when container does not exist', () => {
    it('returns code 404', async () => {
      const response = await server.inject({ method, url: url(99) });
      expect(response.statusCode).toBe(404);
    });
  });
});