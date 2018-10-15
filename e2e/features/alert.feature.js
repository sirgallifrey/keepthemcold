import { Selector } from 'testcafe';
import Actor from '../actor';
import { setSensorState, setAllContainersToDefault, setAllSensorStateToWithinRange } from '../actions';

const I = new Actor();

fixture('Alert')
  .page('localhost:8080')
  .beforeEach(async (t) =>
    Promise.all([
      setAllContainersToDefault,
      setAllSensorStateToWithinRange,
    ])
  );

test('Should not have alerts if temperatures are ok', async t => {
  await setAllSensorStateToWithinRange();

  const alert = Selector('.alert').exists
  await t.expect(alert).notOk();
});

test('sensor 1 alerts', async t => {
  await setAllSensorStateToWithinRange();
  await setSensorState(1, {
    sensorTemperature: -1,
  });
  const alertSelector = Selector('.alert');
  await t.expect(alertSelector.count).eql(1);
  await t.expect(alertSelector.innerText).contains('-1.0 °C');
});

test('sensor 2 alerts', async t => {
  await setAllSensorStateToWithinRange();
  await setSensorState(2, {
    sensorTemperature: -1.1,
  });
  const alertSelector = Selector('.alert');
  await t.expect(alertSelector.count).eql(1);
  await t.expect(alertSelector.innerText).contains('-1.1 °C');
});

test('sensor 3 alerts', async t => {
  await setAllSensorStateToWithinRange();
  await setSensorState(3, {
    sensorTemperature: -1.3,
  });
  const alertSelector = Selector('.alert');
  await t.expect(alertSelector.count).eql(1);
  await t.expect(alertSelector.innerText).contains('-1.3 °C');
});

test('sensor 4 alerts', async t => {
  await setAllSensorStateToWithinRange();
  await setSensorState(4, {
    sensorTemperature: -1.4,
  });
  const alertSelector = Selector('.alert');
  await t.expect(alertSelector.count).eql(1);
  await t.expect(alertSelector.innerText).contains('-1.4 °C');
});

test('sensor 5 alerts', async t => {
  await setAllSensorStateToWithinRange();
  await setSensorState(5, {
    sensorTemperature: -1.5,
  });
  const alertSelector = Selector('.alert');
  await t.expect(alertSelector.count).eql(1);
  await t.expect(alertSelector.innerText).contains('-1.5 °C');
});

test('sensor 6 alerts', async t => {
  await setAllSensorStateToWithinRange();
  await setSensorState(6, {
    sensorTemperature: -1.6,
  });
  const alertSelector = Selector('.alert');
  await t.expect(alertSelector.count).eql(1);
  await t.expect(alertSelector.innerText).contains('-1.6 °C');
});
