import Mouse from 'frampton-browser/mouse';

// function simulateMouseEvent(target, options) {

//   const evt = new MouseEvent(options.type, {
//     view: window,
//     bubbles: true,
//     cancelable: true,
//     clientX: 20,
//     /* whatever properties you want to give it */
//   });

//   target.dispatchEvent(evt);
// }

QUnit.module('Frampton.Browser.Mouse');

QUnit.test('Mouse.position have starting value of [0,0]', function(assert) {
  const mouse = Mouse();
  assert.deepEqual(mouse.position.get(), [0,0]);
});

QUnit.test('Mouse.isDown have starting value of false', function(assert) {
  const mouse = Mouse();
  assert.equal(mouse.isDown.get(), false);
});
