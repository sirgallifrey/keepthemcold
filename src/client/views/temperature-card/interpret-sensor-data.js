export default (container, sensorData) => {
  const {
    minTemperature,
    maxTemperature,
  } = container;

  const {
    temperatureSet,
    sensorTemperature,
  } = sensorData;

  const fixedSensorTemperature = sensorTemperature ? sensorTemperature.toFixed(1) : null;
  const fixedTemperatureSet = temperatureSet ? temperatureSet.toFixed(1) : null;
  const outOfRange = isOutOfRange(fixedSensorTemperature, minTemperature, maxTemperature);
  const shouldAlert = outOfRange || !sensorTemperature;

  const result = {
    shouldAlert,
    fixedSensorTemperature,
    fixedTemperatureSet,
  };
  return result;
};

function isOutOfRange(fixedSensorTemperature, minTemperature, maxTemperature) {
  return fixedSensorTemperature && (fixedSensorTemperature < minTemperature || fixedSensorTemperature > maxTemperature);
}
