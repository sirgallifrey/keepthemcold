'use strict';

const createServer = require('../../../../src/server/create-server.js');
const cleanDatabase = require('../../helpers/clean-database');
const timeTravel = require('../../helpers/time-travel');

const method = 'post';
const url = (id) => `/containers/${id}/sensors`;

describe('post /containers/{id}/sensors', () => {
  let server;

  beforeEach(cleanDatabase);

  beforeEach(() => timeTravel.travelTo(new Date('2018-10-13T00:00:00.000Z')));

  afterEach(timeTravel.travelBack);

  beforeEach(async () => {
    server = await createServer();
  });

  it('returns code 201', async () => {
    const requestPayload = {
      sensorTemperature: 2,
      temperatureSet: 5,
    };

    const response = await server.inject({ method, url: url(2), payload: requestPayload });
    expect(response.statusCode).toBe(201);
  });

  it('publishes data to websocket', async () => {
    const requestPayload = {
      sensorTemperature: 2,
      temperatureSet: 5,
    };

    server.publish = jest.fn(() => Promise.resolve());

    await server.inject({ method, url: url(2), payload: requestPayload });
    expect(server.publish).toHaveBeenCalledWith(
      '/containers/2/sensors',
      {
        id: 2,
        sensorTemperature: 2,
        temperatureSet: 5,
        measuredAt: '2018-10-13T00:00:00.000Z',
      }
    );
  });

  it('returns created sensor data', async () => {
    const requestPayload = {
      sensorTemperature: 20,
      temperatureSet: 40,
    };

    const response = await server.inject({ method, url: url(4), payload: requestPayload });
    const payload = JSON.parse(response.payload);
    expect(payload).toEqual({
      id: 4,
      sensorTemperature: 20,
      temperatureSet: 40,
      measuredAt: '2018-10-13T00:00:00.000Z'
    });
  });

  it('return 404 when container does not exists', async () => {
    const requestPayload = {
      sensorTemperature: 20,
      temperatureSet: 40,
    };

    const response = await server.inject({ method, url: url(44), payload: requestPayload });
    expect(response.statusCode).toBe(404);
  });

  it('returns code 400 when payload is invalid', async () => {
    const requestPayload = {
      invalid: 'prop',
    };

    const response = await server.inject({ method, url: url(3), payload: requestPayload });
    expect(response.statusCode).toBe(400);
  });
});
