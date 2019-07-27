const { add } = require('./math');
const assert = require('chai').assert;

describe('add()', () => {
  it('should add 2 numbers', () => {
    const a = 1; 
    const b = 1;
    const actual = add(a, b);
    assert.equal(actual, 2);
  });
  it('should return false for non-number', () => {
    const a = 1;
    const b = {};
    const actual = add(a, b);
    assert.equal(actual, false);
  });
});
