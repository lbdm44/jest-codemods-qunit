const add = require('../add.js');

describe('add', () => {
  // Comment for fun

  test('should add two numbers', () => {
    // '1 + 1 = 2'
    expect(add(1, 1)).toBe(2);
  });
});
