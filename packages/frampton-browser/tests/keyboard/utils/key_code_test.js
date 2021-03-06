import keyCode from 'frampton-browser/keyboard/utils/key_code';

QUnit.module('Frampton.Browser.Keyboard.Utils.keyCode');

const mockEvent = {
  keyCode : 84
};

QUnit.test('correctly gets keyCode form event object', function(assert) {
  const actual = keyCode(mockEvent);
  const expected = 84;
  assert.equal(actual, expected);
});
