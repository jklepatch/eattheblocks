const Fibonacci = artifacts.require('Fibonacci');

contract('Fibonacci', (accounts) => {
  let fibonacci = null;
  before(async () => {
    fibonacci = await Fibonacci.deployed();
  });
});
