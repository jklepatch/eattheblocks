const { 
  expectRevert, 
  time, 
  constants 
} = require('@openzeppelin/test-helpers'); 
const Timelock = artifacts.require('Timelock.sol');
const MockToken = artifacts.require('MockToken.sol');

contract('Timelock', async accounts => {
  let timelock, token;
  const [deployer, owner, otherAddress, _] = accounts;

  before(async () => {
    timelock = await Timelock.new(owner);
    token = await MockToken.new();
  });

  it('Should lock and unlock token & ether', async () => {
    let contractEtherBalance, contractTokenBakance, ownerTokenBalance;
    const etherAmount = web3.utils.toWei('1');
    const tokenAmount = web3.utils.toWei('1');

    await web3.eth.sendTransaction({
      from: owner,
      to: timelock.address,
      value: etherAmount 
    });
    await token.approve(timelock.address, tokenAmount); 
    await timelock.deposit(token.address, tokenAmount);
    contractEtherBalance = await web3.eth.getBalance(timelock.address);
    contractTokenBalance = await token.balanceOf(timelock.address); 
    assert(contractEtherBalance.toString() === etherAmount);
    assert(contractTokenBalance.toString() === tokenAmount);

    await expectRevert(
      timelock.withdraw(token.address, tokenAmount, {from: otherAddress}),
      'only owner'
    );
    await expectRevert(
      timelock.withdraw(token.address, tokenAmount, {from: owner}),
      'too early'
    );

    await time.increase(time.duration.years(1));
    await timelock.withdraw(constants.ZERO_ADDRESS, etherAmount, {from: owner});
    await timelock.withdraw(token.address, tokenAmount, {from: owner})
    contractEtherBalance = await web3.eth.getBalance(timelock.address);
    contractTokenBalance = await token.balanceOf(timelock.address); 
    ownerEtherBalance = await web3.eth.getBalance(owner);
    ownerTokenBalance = await token.balanceOf(owner);
    assert(contractEtherBalance.toString() === '0');
    assert(contractTokenBalance.toString() === '0');
    assert(ownerTokenBalance.toString() === tokenAmount); 
    assert(ownerEtherBalance.toString().length === 20);
    assert(ownerEtherBalance.toString().slice(0, 2) === '99');
  });
});
