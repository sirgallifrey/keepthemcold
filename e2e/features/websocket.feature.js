import { Selector } from 'testcafe';
import Actor from '../actor';
import { setSensorState, setAllContainersToDefault, setAllSensorStateToWithinRange } from '../actions';

const I = new Actor();

fixture('Websocket')
  .page('localhost:8080')
  .beforeEach(async (t) =>
    Promise.all([
      setAllContainersToDefault,
      setAllSensorStateToWithinRange,
    ])
  );

test('Updates when server broadcasts to sensor 1', async t => {
  await setSensorState(1, {
    sensorTemperature: 9,
    temperatureSet: 13
  });
  await I.see('9.0 °C');
  await I.see('13.0 °C');
});

test('Updates when server broadcasts to sensor 2', async t => {
  await setSensorState(2, {
    sensorTemperature: 4.7,
    temperatureSet: 44
  });
  await I.see('4.7 °C');
  await I.see('44.0 °C');
});

test('Updates when server broadcasts to sensor 3', async t => {
  await setSensorState(3, {
    sensorTemperature: 3.3,
    temperatureSet: 33
  });
  await I.see('3.3 °C');
  await I.see('33.0 °C');
});

test('Updates when server broadcasts to sensor 4', async t => {
  await setSensorState(4, {
    sensorTemperature: 7.7,
    temperatureSet: 21
  });
  await I.see('7.7 °C');
  await I.see('21.0 °C');
});

test('Updates when server broadcasts to sensor 5', async t => {
  await setSensorState(5, {
    sensorTemperature: 5.9,
    temperatureSet: 25
  });
  await I.see('5.9 °C');
  await I.see('25.0 °C');
});

test('Updates when server broadcasts to sensor 6', async t => {
  await setSensorState(6, {
    sensorTemperature: 6.5,
    temperatureSet: 49
  });
  await I.see('6.5 °C');
  await I.see('49.0 °C');
});