const { expectRevert } = require('@openzeppelin/test-helpers');
const Wallet = artifacts.require('Wallet');

contract('Wallet', (accounts) => {
  let wallet;
  beforeEach(async () => {
    wallet = await Wallet.new([accounts[0], accounts[1], accounts[2]], 2);
    await web3.eth.sendTransaction({from: accounts[0], to: wallet.address, value: 1000});
  });

  it('should have correct approvers and quorum', async () => {
    const approvers = await wallet.getApprovers();
    const quorum = await wallet.quorum();
    expect(approvers.length === 2);
    expect(approvers[0] === accounts[0]);
    expect(approvers[1] === accounts[1]);
    expect(quorum.toNumber() === 2);
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

  it('should NOT send transfer if quorum not reached', async () => {
    await wallet.createTransfer(100, accounts[5], {from: accounts[0]});
    const recipientBalanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
    await wallet.sendTransfer(0, {from: accounts[1]});
    const recipientBalanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    assert(recipientBalanceAfter.sub(recipientBalanceBefore).toNumber() === 0);
  });

  it('should NOT send transfer if sender is not approved', async () => {
    await wallet.createTransfer(100, accounts[5], {from: accounts[0]});
    await expectRevert(
      wallet.sendTransfer(0, {from: accounts[5]}),
      'only approver allowed'
    );
  });

  it('should NOT send transfer if already approved', async () => {
    await wallet.createTransfer(100, accounts[5], {from: accounts[0]});
    await wallet.sendTransfer(0, {from: accounts[1]});
    await expectRevert(
      wallet.sendTransfer(0, {from: accounts[1]}),
      'cannot approve transfer twice'
    );
  });

  it('should send transfers if quorum reached', async () => {
    const recipientBalanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
    await wallet.sendTransfer(0, {from: accounts[1]});
    await wallet.sendTransfer(0, {from: accounts[2]});
    const recipientBalanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
    assert(recipientBalanceAfter.sub(recipientBalanceBefore).toNumber() === 100);
  });
});
