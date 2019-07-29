const Voting = artifacts.require('Voting');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('Voting', (accounts) => {
  let voting = null;
  const admin = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  const voter3 = accounts[3];
  const nonVoter = accounts[4];
  before(async () => {
    voting = await Voting.deployed();
  });
});
