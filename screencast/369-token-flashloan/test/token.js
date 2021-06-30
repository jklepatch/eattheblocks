const Token = artifacts.require('Token.sol');
const GoodBorrower = artifacts.require('GoodBorrower.sol');
const BadBorrower = artifacts.require('BadBorrower.sol');

const { expectRevert } = require('@openzeppelin/test-helpers');

contract('Token', () => {
  it('should execute flashloan', async () => {
    const token = await Token.new(); 
    const borrower = await GoodBorrower.new();
    const totalSupplyBefore = await token.totalSupply(); 
    await borrower.startFlashloan(token.address, web3.utils.toWei('1000'))
    const totalSupplyAfter = await token.totalSupply(); 
    assert(totalSupplyBefore.eq(totalSupplyAfter));
  });

  it('should NOT execute flashloan', async () => {
    const token = await Token.new(); 
    const borrower = await BadBorrower.new();
    await expectRevert(
      borrower.startFlashloan(token.address, web3.utils.toWei('1000')),
      'burn amount exceeds balance'
    );
  });
});
