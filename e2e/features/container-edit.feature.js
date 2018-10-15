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

test('Edit label', async t => {
  const pilsener = Selector('*').withText('1 - Pilsener');
  const labelInput = Selector('input[name="label"]');
  const minTemperatureInput = Selector('input[name="minTemperature"]');
  const maxTemperatureInput = Selector('input[name="maxTemperature"]');
  const saveButton = Selector('button').withText('Save');
  await t.debug();
  await t.click(pilsener);
  await t.click(labelInput);
  await t.typeText(labelInput, ' ***');
  await t.click(minTemperatureInput);
  await t.typeText(minTemperatureInput, '98.7');
  await t.click(maxTemperatureInput);
  await t.typeText(maxTemperatureInput, '97.8');
  await t.click(saveButton);
  await I.see('banana');
});