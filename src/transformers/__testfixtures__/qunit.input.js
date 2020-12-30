const add = require('../add.js');

QUnit.module('add', function () {
  // Comment for fun

  QUnit.test('should add two numbers', function (assert) {
    assert.equal(add(1, 1), 2, '1 + 1 = 2');
  });
});
