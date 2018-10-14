const interpretSensorData = require('../../../../src/client/views/temperature-card/interpret-sensor-data').default;

describe('interpret-sensor-data', () => {
  describe('sensor temperature bellow min', () => {
    it('returns shouldAlert true', () => {
      const container = {
        minTemperature: 5.5,
        maxTemperature: 10
      };
      const sensorData = {
        sensorTemperature: 5.4,
        temperatureSet: 10
      };
      const result = interpretSensorData(container, sensorData);
      expect(result.shouldAlert).toBe(true);
    });
  });
  describe('sensor temperature above max', () => {
    it('returns shouldAlert true', () => {
      const container = {
        minTemperature: 5.5,
        maxTemperature: 12
      };
      const sensorData = {
        sensorTemperature: 12.1,
        temperatureSet: 10
      };
      const result = interpretSensorData(container, sensorData);
      expect(result.shouldAlert).toBe(true);
    });
  });
  describe('sensor temperature whithin limits', () => {
    it('returns shouldAlert false', () => {
      const container = {
        minTemperature: 5.5,
        maxTemperature: 10
      };
      const sensorData = {
        sensorTemperature: 5.5,
        temperatureSet: 10
      };
      const result = interpretSensorData(container, sensorData);
      expect(result.shouldAlert).toBe(false);
    });
  });
  describe('sensor temperature missing', () => {
    it('returns shouldAlert true', () => {
      const container = {
        minTemperature: 5.5,
        maxTemperature: 10
      };
      const sensorData = {
        temperatureSet: 10
      };
      const result = interpretSensorData(container, sensorData);
      expect(result.shouldAlert).toBe(true);
    });
    it('returns fixedSensorTemperature null', () => {
      const container = {
        minTemperature: 5.5,
        maxTemperature: 10
      };
      const sensorData = {
        temperatureSet: 10
      };
      const result = interpretSensorData(container, sensorData);
      expect(result.fixedSensorTemperature).toBe(null);
    });
  });
  describe('temperature set missing', () => {
    it('returns shouldAlert false if sensorTemperature is whithin limits', () => {
      const container = {
        minTemperature: 5.5,
        maxTemperature: 10
      };
      const sensorData = {
        sensorTemperature: 6,
      };
      const result = interpretSensorData(container, sensorData);
      expect(result.shouldAlert).toBe(false);
    });
    it('returns fixedTemperatureSet null', () => {
      const container = {
        minTemperature: 5.5,
        maxTemperature: 10
      };
      const sensorData = {
        fixedSensorTemperature: 10
      };
      const result = interpretSensorData(container, sensorData);
      expect(result.fixedTemperatureSet).toBe(null);
    });
  });
});
