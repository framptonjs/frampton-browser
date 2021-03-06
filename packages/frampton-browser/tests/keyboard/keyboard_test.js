import Keyboard from 'frampton-browser/keyboard/keyboard';

QUnit.module('Frampton.Browser.Keyboard', {
  beforeEach() {
    this.keyboard = Keyboard();
  },
  afterEach() {
    this.keyboard = null;
  }
});

QUnit.test('Keyboard.arrows have initial value of [0,0]', function(assert) {
  const actual = this.keyboard.arrows.get();
  const expected = [0, 0];
  assert.deepEqual(actual, expected);
});

QUnit.test('Keyboard.shift have initial value of false', function(assert) {
  const actual = this.keyboard.shift.get();
  const expected = false;
  assert.equal(actual, expected);
});

QUnit.test('Keyboard.ctrl have initial value of false', function(assert) {
  const actual = this.keyboard.ctrl.get();
  const expected = false;
  assert.equal(actual, expected);
});

QUnit.test('Keyboard.escape have initial value of false', function(assert) {
  const actual = this.keyboard.escape.get();
  const expected = false;
  assert.equal(actual, expected);
});

QUnit.test('Keyboard.enter have initial value of false', function(assert) {
  const actual = this.keyboard.enter.get();
  const expected = false;
  assert.equal(actual, expected);
});

QUnit.test('Keyboard.space have initial value of false', function(assert) {
  const actual = this.keyboard.space.get();
  const expected = false;
  assert.equal(actual, expected);
});
