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
      label: 'Potter',
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
    });
  });

  it('publish all containers after creation', async () => {
    const requestPayload = {
      id: 10,
      label: 'Potter',
      minTemperature: 2,
      maxTemperature: 4,
    };

    server.publish = jest.fn(() => Promise.resolve());

    await server.inject({ method, url, payload: requestPayload });
    expect(server.publish).toHaveBeenCalledWith(
      '/containers',
      [
        {
          id: 1,
          label: 'Pilsener',
          minTemperature: 4,
          maxTemperature: 6,
        },
        {
          id: 2,
          label: 'IPA',
          minTemperature: 5,
          maxTemperature: 6,
        },
        {
          id: 3,
          label: 'Lager',
          minTemperature: 4,
          maxTemperature: 7,
        },
        {
          id: 4,
          label: 'Stout',
          minTemperature: 6,
          maxTemperature: 8,
        },
        {
          id: 5,
          label: 'Wheat beer',
          minTemperature: 3,
          maxTemperature: 5,
        },
        {
          id: 6,
          label: 'Pale Ale',
          minTemperature: 4,
          maxTemperature: 6,
        },
        {
          id: 10,
          label: 'Potter',
          minTemperature: 2,
          maxTemperature: 4,
        },
      ]
    );
  });

  describe('when container id already exists', () => {
    it('returns code 409', async () => {
      const requestPayload = {
        id: 1,
        label: 'Potter',
        minTemperature: 2,
        maxTemperature: 4,
      };
  
      const response = await server.inject({ method, url, payload: requestPayload });
      expect(response.statusCode).toBe(409);
    });
  });

  it('returns code 400 when payload is invalid', async () => {
    const requestPayload = {
      label: 'Potter',
      minTemperature: 2,
    };

    const response = await server.inject({ method, url, payload: requestPayload });
    expect(response.statusCode).toBe(400);
  });
});
