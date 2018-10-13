const createServer = require('../../../../src/server/create-server.js');
const cleanDatabase = require('../../helpers/clean-database');

const method = 'get';
const url = '/containers';

describe('get /containers', () => {
  let server;

  beforeEach(cleanDatabase);

  beforeEach(async () => {
    server = await createServer();
  });

  it('returns code 200', async () => {
    const response = await server.inject({ method, url });
    expect(response.statusCode).toBe(200);
  });

  it('returns a list of containers', async () => {
    const response = await server.inject({ method, url });
    const payload = JSON.parse(response.payload);
    expect(payload).toMatchObject([
      {
        id: expect.any(Number),
        label: expect.any(String),
        minTemperature: expect.any(Number),
        maxTemperature: expect.any(Number),
      },
      {
        id: expect.any(Number),
        label: expect.any(String),
        minTemperature: expect.any(Number),
        maxTemperature: expect.any(Number),
      },
      {
        id: expect.any(Number),
        label: expect.any(String),
        minTemperature: expect.any(Number),
        maxTemperature: expect.any(Number),
      },
      {
        id: expect.any(Number),
        label: expect.any(String),
        minTemperature: expect.any(Number),
        maxTemperature: expect.any(Number),
      },
      {
        id: expect.any(Number),
        label: expect.any(String),
        minTemperature: expect.any(Number),
        maxTemperature: expect.any(Number),
      },
      {
        id: expect.any(Number),
        label: expect.any(String),
        minTemperature: expect.any(Number),
        maxTemperature: expect.any(Number),
      },
    ])
  });
});