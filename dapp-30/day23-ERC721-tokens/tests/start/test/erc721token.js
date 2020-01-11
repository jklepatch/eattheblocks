const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const Token = artifacts.require('ERC721Token.sol');
const MockBadRecipient = artifacts.require('MockBadRecipient.sol');

contract('ERC721Token', accounts => {
  let token;
  const [admin, trader1, trader2] = [accounts[0], accounts[1], accounts[2]];

  beforeEach(async () => {
    token = await Token.new();
    for(let i = 0; i < 3; i++) {
      await token.mint();
    }
  });

  it('should NOT mint if not admin', async () => {
  });

  it('should mint if admin', async () => {
  });

  it('should NOT transfer if balance is 0', async () => {
  });

  it('should NOT transfer if not owner', async () => {
  });

  //Bug here, skip this test :( see end code for explanation
  it.skip(
    'safeTransferFrom() should NOT transfer if recipient contract does not implement erc721recipient interface', 
    async () => {
  });

  it('transferFrom() should transfer', async () => {
  });

  it('safeTransferFrom() should transfer', async () => {
  });

  it('should transfer token when approved', async () => {
  });
});
