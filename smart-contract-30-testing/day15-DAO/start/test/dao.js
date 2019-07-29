const DAO = artifacts.require('DAO');

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

contract('DAO', (accounts) => {
  let dao = null;
  const investor1 = accounts[1];
  const investor2 = accounts[2];
  const investor3 = accounts[3];
  before(async () => {
    dao = await DAO.deployed();
  });
});
