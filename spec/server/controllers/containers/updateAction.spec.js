const createServer = require('../../../../src/server/create-server.js');
const cleanDatabase = require('../../helpers/clean-database');

const method = 'put';
const url = (id) => `/containers/${id}`;

describe('put /containers/{id}', () => {
  let server;

  beforeEach(cleanDatabase);

  beforeEach(async () => {
    server = await createServer();
  });

  it('returns code 200', async () => {
    const requestPayload = {
      id: 2,
      label: 'New Name',
      minTemperature: 2,
      maxTemperature: 4,
    };

    const response = await server.inject({ method, url: url(2), payload: requestPayload });
    expect(response.statusCode).toBe(200);
  });

  it('returns updated container', async () => {
    const requestPayload = {
      id: 3,
      label: 'Potter',
      minTemperature: 2,
      maxTemperature: 12,
    };

    const response = await server.inject({ method, url: url(3), payload: requestPayload });
    const payload = JSON.parse(response.payload);
    expect(payload).toEqual({
      id: 3,
      label: 'Potter',
      minTemperature: 2,
      maxTemperature: 12,
    });
  });

  it('publish all containers after update', async () => {
    const requestPayload = {
      id: 3,
      label: 'Potter',
      minTemperature: 2,
      maxTemperature: 12,
    };

    server.publish = jest.fn(() => Promise.resolve());

    await server.inject({ method, url: url(3), payload: requestPayload });
    
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
          label: 'Potter',
          minTemperature: 2,
          maxTemperature: 12,
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
      ]
    );
  });

  it('returns code 400 when payload is invalid', async () => {
    const requestPayload = {
      label: 'Potter',
      minTemperature: 2,
    };

    const response = await server.inject({ method, url: url(4), payload: requestPayload });
    expect(response.statusCode).toBe(400);
  });

  it('returns code 404 when container does not exists', async () => {
    const requestPayload = {
      id: 3,
      label: 'Potter',
      minTemperature: 2,
      maxTemperature: 12,
    };

    const response = await server.inject({ method, url: url(80), payload: requestPayload });
    expect(response.statusCode).toBe(404);
  });
});
