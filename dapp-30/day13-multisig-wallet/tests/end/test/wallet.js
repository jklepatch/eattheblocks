const { expectRevert } = require('@openzeppelin/test-helpers');
const Wallet = artifacts.require('Wallet');

contract('Wallet', (accounts) => {
  let wallet = null;
  before(async () => {
    wallet = await Wallet.deployed();
  });

  it('should create transfers', async () => {
    await wallet.createTransfer(100, accounts[5], {from: accounts[0]});
    const transfer = await wallet.transfers(0);
    assert(transfer.id.toNumber() === 0);
    assert(transfer.amount.toNumber() === 100);
  });

  it('should NOT create transfers if sender is not approver', async () => {
    await expectRevert(
      wallet.createTransfer(100, accounts[5], {from: accounts[4]}),
      'only approver allowed'
    );
  });

  it('should NOT send transfers if quorum not reached', async () => {
    const recipientBalanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
    await wallet.sendTransfer(1, {from: accounts[1]});
    const recipientBalanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    assert(recipientBalanceAfter.sub(recipientBalanceBefore).toNumber() === 0);
  });

  it('should send transfers if quorum reached', async () => {
    const recipientBalanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
    await wallet.sendTransfer(2, {from: accounts[1]});
    await wallet.sendTransfer(2, {from: accounts[2]});
    const recipientBalanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    assert(recipientBalanceAfter.sub(recipientBalanceBefore).toNumber() === 100);
  });
});
