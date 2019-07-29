const Strings = artifacts.require('Strings');

contract('Strings', () => {
  let strings = null;
  before(async () => {
    strings = await Strings.deployed();
  });
});

