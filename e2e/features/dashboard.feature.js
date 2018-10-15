import { Selector } from 'testcafe';
import Actor from '../actor';

const I = new Actor();

fixture('Blocking Warning')
  .page('localhost:8080');

test('Has default containers', async t => {
  
  await I.see('1 - Pilsener');
});

test('Impossible', async t => {
  
  await I.see('Lets see the est fail on travis');
});
