const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const Token = artifacts.require('ERC20Token.sol');

contract('ERC20Token', accounts => {
  let token;
  const initialBalance = web3.utils.toBN(web3.utils.toWei('1'));

  beforeEach(async () => {
    token = await Token.new('My Token', 'TKN', 18, initialBalance); 
  });

  it('should return the total supply', async () => {
    const supply = await token.totalSupply();
    assert(supply.eq(initialBalance));
  });

  it('should return the correct balance', async () => {
    const balance = await token.balanceOf(accounts[0]);
    assert(balance.eq(initialBalance));
  });

  it('should transfer token', async () => {
    const transfer = web3.utils.toBN(100);
    const receipt = await token.transfer(accounts[1], transfer);
    const balance1 = await token.balanceOf(accounts[0]);
    const balance2 = await token.balanceOf(accounts[1]);
    const initialBalance = web3.utils.toBN(web3.utils.toWei('1'));
    assert(balance1.eq(initialBalance.sub(transfer)));
    expectEvent(receipt, 'Transfer', {
      from: accounts[0],
      to: accounts[1],
      tokens: transfer
    });
  });

  it('should NOT transfer token if balance too low', async () => {
    await expectRevert(
      token.transfer(accounts[1], web3.utils.toWei('10')),
      'token balance too low'
    );
  });

  it('should transfer token when approved', async () => {
    let allowance;
    let receipt;
    const _100 = web3.utils.toBN(100);

    allowance = await token.allowance(accounts[0], accounts[1]);
    assert(allowance.isZero());

    receipt = await token.approve(accounts[1], _100);
    allowance = await token.allowance(accounts[0], accounts[1]);
    assert(allowance.eq(_100));
    expectEvent(receipt, 'Approval', {
      tokenOwner: accounts[0],
      spender: accounts[1],
      tokens: _100
    });

    receipt = await token.transferFrom(
      accounts[0], 
      accounts[2], 
      _100, 
      {from: accounts[1]}
    );
    allowance = await token.allowance(accounts[0], accounts[1]);
    const balance1 = await token.balanceOf(accounts[0]);
    const balance2 = await token.balanceOf(accounts[2]);
    assert(balance1.eq(initialBalance.sub(_100)));
    assert(balance2.eq(_100));
    assert(allowance.isZero());
    expectEvent(receipt, 'Transfer', {
      from: accounts[0],
      to: accounts[2],
      tokens: _100
    });
  });

  it('should NOT transfer token if not approved', async () => {
    await expectRevert(
      token.transferFrom(accounts[0], accounts[1], 10),
      'allowance too low'
    );
  });

});
