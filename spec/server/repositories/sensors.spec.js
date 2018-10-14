const sensors = require('../../../src/server/repositories/sensors');
const timeTravel = require('../helpers/time-travel');

describe('validate', () => {
  describe('with valid data', () => {
    it('wont throw if is valid', () => {
      sensors.validate({
        id: 1,
        sensorTemperature: 5.5,
        temperatureSet: 6.5,
        measuredAt: '2018-10-13T00:00:00.000Z'
      });
    });

    it('wont throw if sensorTemperature is missing', () => {
      sensors.validate({
        id: 1,
        temperatureSet: 4.4,
        measuredAt: '2018-10-13T00:00:00.000Z'
      });
    });

    it('wont throw if temperatureSet is missing', () => {
      sensors.validate({
        id: 1,
        sensorTemperature: 5.5,
        measuredAt: '2018-10-13T00:00:00.000Z'
      });
    });
  });

  describe('with invalid data', () => {
    describe('id', () => {
      it('throws if id is missing', () => {
        expect(() => {
          sensors.validate({
            sensorTemperature: 20,
            tempertureSet: 2,
            measuredAt: '2018-10-13T00:00:00.000Z'
          });
        }).toThrowError('child "id" fails because ["id" is required]');
      });

      it('throws if id is not a number', () => {
        expect(() => {
          sensors.validate({
            id: 'abc',
            sensorTemperature: 20,
            tempertureSet: 2,
            measuredAt: '2018-10-13T00:00:00.000Z'
          });
        }).toThrowError('child "id" fails because ["id" must be a number]');
      });

      it('throws if id is not a integer', () => {
        expect(() => {
          sensors.validate({
            id: 1.3,
            sensorTemperature: 20,
            tempertureSet: 2,
            measuredAt: '2018-10-13T00:00:00.000Z'
          });
        }).toThrowError('child "id" fails because ["id" must be an integer]');
      });
    });

    describe('sensorTemperature', () => {
      it('throws if sensorTemperature is not a number', () => {
        expect(() => {
          sensors.validate({
            id: 6,
            sensorTemperature: 'cold',
            tempertureSet: 2,
            measuredAt: '2018-10-13T00:00:00.000'
          });
        }).toThrowError('child "sensorTemperature" fails because ["sensorTemperature" must be a number]');
      });
    });

    describe('temperatureSet', () => {
      it('throws if temperatureSet is not a number', () => {
        expect(() => {
          sensors.validate({
            id: 6,
            sensorTemperature: 23,
            temperatureSet: 'hot',
            measuredAt: '2018-10-13T00:00:00.000'
          });
        }).toThrowError('child "temperatureSet" fails because ["temperatureSet" must be a number]');
      });
    });

    describe('measuredAt', () => {
      it('throws if measuredAt is not a string', () => {
        expect(() => {
          sensors.validate({
            id: 6,
            sensorTemperature: 3.2,
            tempertureSet: 2,
            measuredAt: new Date()
          });
        }).toThrowError('child "measuredAt" fails because ["measuredAt" must be a string]');
      });

      it('throws if measuredAt is not a ISO date', () => {
        expect(() => {
          sensors.validate({
            id: 6,
            sensorTemperature: 3.2,
            tempertureSet: 2,
            measuredAt: '13/10/2018'
          });
        }).toThrowError('child "measuredAt" fails because ["measuredAt" must be a valid ISO 8601 date]');
      });
    });    
  });
});

describe('upsert', () => {
  beforeEach(() => timeTravel.travelTo(new Date('2018-10-13T00:00:00.000Z')));
  afterEach(timeTravel.travelBack);

  it('adds current date as measuredAt', () => {
    const sensor = sensors.upsert({
      id: 30,
      sensorTemperature: 30,
    });
    expect(sensor).toEqual({
      id: 30,
      sensorTemperature: 30,
      measuredAt: '2018-10-13T00:00:00.000Z'
    });
  });
  it('ignores measuredAt if given', () => {
    const sensor = sensors.upsert({
      id: 77,
      sensorTemperature: 23.7,
      measuredAt: '2018-10-13T12:00:00.000Z'
    });
    expect(sensor).toEqual({
      id: 77,
      sensorTemperature: 23.7,
      measuredAt: '2018-10-13T00:00:00.000Z'
    });
  });
});
