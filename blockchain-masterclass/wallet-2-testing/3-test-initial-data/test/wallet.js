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
});
