const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', (accounts) => {
  let etherWallet = null;
  before(async () => {
    etherWallet = await EtherWallet.deployed();
  });

  it('Should set the deploying address as owner', async () => {
    const owner = await etherWallet.owner();
    assert(owner === accounts[0]);
  });

  it('Should deposit ether to etherWallet', async () => {
    await etherWallet.deposit({from: accounts[0], value: 100});
    const balance = await web3.eth.getBalance(etherWallet.address);
    assert(parseInt(balance) === 100);
  });

  it('Should return balance of wallet', async () => {
    const balance = await etherWallet.balanceOf();
    assert(parseInt(balance) === 100);
  });

  it('Should transfer ether to another address', async () => {
    const balanceRecipientBefore = await web3.eth.getBalance(accounts[1]);
    await etherWallet.send(accounts[1], 50, {from: accounts[0]});
    const balanceWallet = await web3.eth.getBalance(etherWallet.address);
    const balanceRecipientAfter = await web3.eth.getBalance(accounts[1]);
    assert(parseInt(balanceWallet) === 50);
    const finalBalance = web3.utils.toBN(balanceRecipientAfter);
    const initialBalance = web3.utils.toBN(balanceRecipientBefore);
    assert(finalBalance.sub(initialBalance).toNumber() === 50);
  });

  it('Should NOT transfer ether if contract balance too low', async () => {
    try {
      await etherWallet.send(accounts[1], 500, {from: accounts[0]});
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert');
      return;
    }
    assert(false);
  });

  it('Should NOT transfer ether if tx not sent from owner', async () => {
    try {
      await etherWallet.send(accounts[1], 50, {from: accounts[1]});
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert sender is not allowed -- Reason given: sender is not allowed.');
      return;
    }
    assert(false);
  });
});
