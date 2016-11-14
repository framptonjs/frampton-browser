import _window from 'frampton-browser/window';

QUnit.module('Frampton.Browser.Window');

QUnit.test('Window.dimensions is a tuple of width and height', function(assert) {
  const win = _window();
  const expectedWidth = win.width.get();
  const expectedHeight = win.height.get();
  const [width, height] = win.dimensions.get();
  assert.equal(width, expectedWidth);
  assert.equal(height, expectedHeight);
});
