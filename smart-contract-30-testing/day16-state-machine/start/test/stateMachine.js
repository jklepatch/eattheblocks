const StateMachine = artifacts.require('StateMachine');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)); 
const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('StateMachine', (accounts) => {
  let stateMachine = null;
  const borrower = accounts[1];
  const lender = accounts[2];
  before(async () => {
    stateMachine = await StateMachine.deployed();
  });
});
