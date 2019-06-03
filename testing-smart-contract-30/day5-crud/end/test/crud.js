const Crud = artifacts.require('Crud');

contract('Crud', (accounts) => {
  let crud = null;
  before(async () => {
    crud = await Crud.deployed();
  });

  it('Should create a new user', async () => {
    await crud.create('Frank', {from: accounts[0]});
    const user = await crud.read(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === 'Frank');
  });

  it('Should update an existing user', async () => {
    await crud.update(1, 'Frankk', {from: accounts[0]});
    const user = await crud.read(1);
    assert(user[0].toNumber() === 1);
    assert(user[1] === 'Frankk');
  });

  it('Should NOT update a non-existing user', async () => {
    try {
      await crud.update(2, 'Frankk', {from: accounts[0]});
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert User does not exist! -- Reason given: User does not exist!.');
      return;
    }
    assert(false);
  });

  it('Should destroy an existing user', async () => {
    await crud.destroy(1, {from: accounts[0]});
    try {
      const user = await crud.read(1);
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert User does not exist!');
      return;
    }
    assert(false);
  });

  it('Should NOT destroy an existing user', async () => {
    try {
      await crud.destroy(10, {from: accounts[0]});
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert User does not exist! -- Reason given: User does not exist!.');
      return;
    }
    assert(false);
  });
});


