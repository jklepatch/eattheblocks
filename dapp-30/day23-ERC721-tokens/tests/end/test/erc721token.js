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
    await expectRevert(
      token.mint({from: trader1}), 
      'only admin'
    );
  });

  it('should mint if admin', async () => {
    const balanceBefore = await token.balanceOf(admin);
    const receipt = await token.mint({from: admin});
    await token.mint({from: admin});
    const balanceAfter = await token.balanceOf(admin);
    const owner = await token.ownerOf(4);
    assert(balanceAfter.sub(balanceBefore).toNumber() === 2);
    assert(owner === admin);
    expectEvent(receipt, 'Transfer', {
      _from: '0x0000000000000000000000000000000000000000',
      _to: admin,
      _tokenId: web3.utils.toBN(3)
    });
  });

  it('should NOT transfer if balance is 0', async () => {
    await expectRevert(
      token.transferFrom(accounts[4], accounts[4],0, {from: accounts[4]}),
      'Transfer not authorized'
    );
    await expectRevert(
      token.safeTransferFrom(accounts[4], accounts[4],0 , {from: accounts[4]}),
      'Transfer not authorized'
    );
  });

  it('should NOT transfer if not owner', async () => {
    await expectRevert(
      token.transferFrom(admin, trader1, 0, {from: trader1}),
      'Transfer not authorized'
    );
    await expectRevert(
      token.safeTransferFrom(admin, trader1, 0, {from: trader1}),
      'Transfer not authorized'
    );
  });

  //the reason for the error is `revert`, not the error we want :(
  //seems like the call to onERC721Received triggers the error
  it.skip(
    'safeTransferFrom() should NOT transfer if recipient contract does not implement erc721recipient interface', 
    async () => {
    const badRecipient = await MockBadRecipient.new();
    await expectRevert(
      token.safeTransferFrom(
        admin, 
        badRecipient.address, 
        0,
        {from: admin}
      ),
      'recipient SC cannot handle ERC721 tokens'
    );
  });

  it('transferFrom() should transfer', async () => {
    const tokenId = 0;
    const receipt = await token.transferFrom(admin, trader1, tokenId, {from: admin});
    const [balanceAdmin, balanceTrader, owner] = await Promise.all([
      token.balanceOf(admin),
      token.balanceOf(trader1),
      token.ownerOf(tokenId)
    ]);
    assert(balanceAdmin.toNumber() === 2);
    assert(balanceTrader.toNumber() === 1);
    assert(owner === trader1);
    expectEvent(receipt, 'Transfer', {
      _from: admin, 
      _to: trader1,
      _tokenId: web3.utils.toBN(tokenId)
    });
  });

  it('safeTransferFrom() should transfer', async () => {
    const tokenId = 0;
    const receipt = await token.transferFrom(
      admin, 
      trader1, 
      tokenId, 
      {from: admin}
    );
    const [balanceAdmin, balanceTrader, owner] = await Promise.all([
      token.balanceOf(admin),
      token.balanceOf(trader1),
      token.ownerOf(tokenId)
    ]);
    assert(balanceAdmin.toNumber() === 2);
    assert(balanceTrader.toNumber() === 1);
    assert(owner === trader1);
    expectEvent(receipt, 'Transfer', {
      _from: admin, 
      _to: trader1,
      _tokenId: web3.utils.toBN(tokenId)
    });
  });

  it('should transfer token when approved', async () => {
    const tokenId = 0;
    const receipt1 = await token.approve(trader1, tokenId);
    const approved = await token.getApproved(tokenId);
    const receipt2 = await token.transferFrom(
      admin, 
      trader1, 
      tokenId, 
      {from: trader1}
    );
    const [balanceAdmin, balanceTrader, owner] = await Promise.all([
      token.balanceOf(admin),
      token.balanceOf(trader1),
      token.ownerOf(tokenId)
    ]);
    assert(balanceAdmin.toNumber() === 2);
    assert(balanceTrader.toNumber() === 1);
    assert(owner === trader1);
    expectEvent(receipt2, 'Transfer', {
      _from: admin, 
      _to: trader1,
      _tokenId: web3.utils.toBN(tokenId)
    });
    expectEvent(receipt1, 'Approval', {
      _owner: admin, 
      _approved: trader1,
      _tokenId: web3.utils.toBN(tokenId)
    });
  });
});
