import { Selector, t } from 'testcafe';

export default class Actor {
  async see(value, selector) {
    const body = Selector('body');
    if (selector) {
      await t.expect(Selector(selector).withText(value).exists).ok();
    }
    else if (isRegex(value)) {
      await t.expect(body.innerText).match(value);
    } else {
      await t.expect(body.innerText).contains(value);
    }
  }

  async dontSee(value, selector) {
    const body = Selector('body');
    if (selector) {
      await t.expect(Selector(selector).withText(value).exists).notOk();
    }
    else if (isRegex(value)) {
      await t.expect(body.innerText).notMatch(value);
    } else {
      await t.expect(body.innerText).notContains(value);
    }
  }
}

function isRegex(value) {
  return typeof value === 'object' && typeof value.test === 'function';
}
