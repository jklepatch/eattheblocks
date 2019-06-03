const DeedMultiPayout = artifacts.require('DeedMultiPayout');

contract('DeedMultiPayout', (accounts) => {
  let deedMultiPayout = null;
  before(async () => {
    deedMultiPayout = await DeedMultiPayout.deployed();
  });

  it('should withdraw', async () => {
    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    await new Promise(resolve => setTimeout(resolve, 5000));
    await deedMultiPayout.withdraw({from: accounts[0]});
    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
    assert(finalBalance.sub(initialBalance).toNumber() === 100);
  });

  it('should NOT withdraw if too early', async () => {
    try {
      await deedMultiPayout.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert too early -- Reason given: too early.');
    }
  });

  it('should NOT withdraw if not called from lawayer', async () => {
    try {
      await deedMultiPayout.withdraw({from: accounts[1]});
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert lawyer only -- Reason given: lawyer only.');
    }
  });
});



