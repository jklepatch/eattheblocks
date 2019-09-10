const Lottery = artifacts.require('Lottery');
const timeHelper = require('ganache-time-traveler');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('Lottery', (accounts) => {
  let lottery = null;
  before(async () => {
    lottery = await Lottery.deployed();
  });
});
  
