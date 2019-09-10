const DeedMultiPayout = artifacts.require('DeedMultiPayout');

contract('DeedMultiPayout', (accounts) => {
  let deedMultiPayout = null;
  before(async () => {
    deedMultiPayout = await DeedMultiPayout.deployed();
  });

  it('should withdraw for all payouts (1)', async () => {
    for(let i = 0; i < 4; i++) {
      const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      await new Promise(resolve => setTimeout(resolve, 1000));
      await deedMultiPayout.withdraw({from: accounts[0]});
      const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      assert(finalBalance.sub(initialBalance).toNumber() === 25);
    }
  });

  it('should withdraw for all payouts (2)', async () => {
    const deedMultiPayout = await DeedMultiPayout.new(
      accounts[0], 
      accounts[1], 
      1, 
      {value: 100}
    );
    for(let i = 0; i < 2; i++) {
      const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      await new Promise(resolve => setTimeout(resolve, 2000));
      await deedMultiPayout.withdraw({from: accounts[0]});
      const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
      assert(finalBalance.sub(initialBalance).toNumber() === 50);
    }
  });

  it('should NOT withdraw if no payout left', async () => {
    try {
      await deedMultiPayout.withdraw({from: accounts[0]});
    } catch (e) {
      assert(e.message.includes('no payout left'));
      return;
    }
    assert(false);
  });

  it('should NOT withdraw if too early', async () => {
    const deedMultiPayout = await DeedMultiPayout.new(
      accounts[0], 
      accounts[1], 
      5, 
      {value: 100}
    );
    try {
      await deedMultiPayout.withdraw({from: accounts[0]});
    } catch(e) {
      assert(e.message.includes('too early'));
      return;
    }
    assert(false);
  });

  it('should NOT withdraw if caller is not lawyer', async () => {
    const deedMultiPayout = await DeedMultiPayout.new(
      accounts[0], 
      accounts[1], 
      5, 
      {value: 100}
    );
    try {
      await deedMultiPayout.withdraw({from: accounts[1]});
    } catch(e) {
      assert(e.message.includes('lawyer only'));
      return;
    }
    assert(false);
  });
});



