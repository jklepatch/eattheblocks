const Escrow = artifacts.require('Escrow');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('Escrow', () => {
  let escrow = null;
  before(async () => {
    escrow = await Escrow.deployed();
  });
});

