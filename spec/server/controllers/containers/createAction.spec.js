const createServer = require('../../../../src/server/create-server.js');
const cleanDatabase = require('../../helpers/clean-database');

const method = 'post';
const url = '/containers';

describe('post /containers', () => {
  let server;

  beforeEach(cleanDatabase);

  beforeEach(async () => {
    server = await createServer();
  });

  it('returns code 201', async () => {
    const requestPayload = {
      id: 10,
      label: "Potter",
      minTemperature: 2,
      maxTemperature: 4,
    };

    const response = await server.inject({ method, url, payload: requestPayload });
    expect(response.statusCode).toBe(201);
  });

  it('returns created container', async () => {
    const requestPayload = {
      id: 10,
      label: 'Potter',
      minTemperature: 2,
      maxTemperature: 4,
    };

    const response = await server.inject({ method, url, payload: requestPayload });
    const payload = JSON.parse(response.payload);
    expect(payload).toEqual({
      id: 10,
      label: 'Potter',
      minTemperature: 2,
      maxTemperature: 4,
    })
  });

  describe('when container id already exists', () => {
    it('returns code 409', async () => {
      const requestPayload = {
        id: 1,
        label: "Potter",
        minTemperature: 2,
        maxTemperature: 4,
      };
  
      const response = await server.inject({ method, url, payload: requestPayload });
      expect(response.statusCode).toBe(409);
    });
  });

  it('returns code 400 when payload is invalid', async () => {
    const requestPayload = {
      label: "Potter",
      minTemperature: 2,
    };

    const response = await server.inject({ method, url, payload: requestPayload });
    expect(response.statusCode).toBe(400);
  });
});
