const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const Token = artifacts.require('ERC20Token.sol');

contract('ERC20Token', accounts => {
  let token;

  beforeEach(async () => {
    token = await Token.new('My Token', 'TKN', 18, initialBalance); 
  });
});
