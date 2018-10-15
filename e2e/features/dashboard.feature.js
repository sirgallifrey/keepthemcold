import { Selector } from 'testcafe';
import Actor from '../actor';
import { setSensorState, setAllContainersToDefault, setAllSensorStateToWithinRange } from '../actions';

const I = new Actor();

fixture('Dashboard')
  .page('localhost:8080')
  .beforeEach(async (t) =>
    Promise.all([
      setAllContainersToDefault,
      setAllSensorStateToWithinRange,
    ])
  );

test('Has default containers', async t => {
  await I.see('1 - Pilsener');
  await I.see('2 - IPA');
  await I.see('3 - Lager');
  await I.see('4 - Stout');
  await I.see('5 - Wheat beer');
  await I.see('6 - Pale Ale');
});
