const createServer = require('../../../../src/server/create-server');
const cleanDatabase = require('../../helpers/clean-database');
const containers = require('../../../../src/server/repositories/containers');

const method = 'delete';
const url = (id) => `/containers/${id}`;

describe('delete /containers/{id}', () => {
  let server;

  beforeEach(cleanDatabase);

  beforeEach(async () => {
    server = await createServer();
  });

  describe('when container exists', () => {
    it('returns code 204', async () => {
      const response = await server.inject({ method, url: url(1) });
      expect(response.statusCode).toBe(204);
    });

    it('returns nothing', async () => {
      const response = await server.inject({ method, url: url(2) });
      expect(response.payload).toEqual('');
    });

    it('removes container from the database', async () => {
      await server.inject({ method, url: url(3) });
      expect(() => containers.getById(3)).toThrow();
    });

    it('cant be deleted two times', async () => {
      expect.assertions(2);
      const response = await server.inject({ method, url: url(1) });
      expect(response.statusCode).toBe(204);
      const secondResponse = await server.inject({ method, url: url(1) });
      expect(secondResponse.statusCode).toBe(404);
    });
  });

  describe('when container does not exist', () => {
    it('returns code 404', async () => {
      const response = await server.inject({ method, url: url(99) });
      expect(response.statusCode).toBe(404);
    });
  });
});
