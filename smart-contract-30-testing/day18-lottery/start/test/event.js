const EventContract = artifacts.require('EventContract');
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

contract('EventContract', (accounts) => {
  let eventContract = null;
  before(async () => {
    eventContract = await EventContract.deployed();
  });
});
