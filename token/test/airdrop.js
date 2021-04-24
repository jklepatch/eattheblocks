const { expectRevert } = require('@openzeppelin/test-helpers');
const Token = artifacts.require('ETBToken.sol');
const Airdrop = artifacts.require('Airdrop.sol');

contract('Airdrop', ([admin, _]) => {
  let token, airdrop;
  const TOTAL_SUPPLY = web3.utils.toWei('1000000');
  const AIRDROP = web3.utils.toWei('100000');

  before(async () => {
    token = await Token.new();
    airdrop = await Airdrop.new(token.address);
    await token.transfer(airdrop.address, AIRDROP); 
  });

  it('Should Airdrop', async () => {
    //priv keys of test accounts:
    //https://github.com/trufflesuite/truffle-core/blob/ab4281ff3363da4810168b750de6f525da20fd17/lib/commands/develop.js#L68
    const privKey = '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
    const { address } = web3.eth.accounts.create();
    const recipient = address;
    const amount = 100;
    const message = web3.utils.soliditySha3(
      {t: 'address', v: recipient},
      {t: 'uint256', v: amount}
    ).toString('hex');
    const { signature } = web3.eth.accounts.sign(
      message, 
      privKey
    );
    await airdrop.claimTokens(recipient, amount, signature);
    const balance = await token.balanceOf(recipient); 
    assert(balance.eq(web3.utils.toBN(amount)));

    //cannot claim twice
    await expectRevert(
      airdrop.claimTokens(recipient, amount, signature),
      'airdrop already processed'
    );

    //wrong recipient
    const { address: recipient2} = web3.eth.accounts.create();
    await expectRevert(
      airdrop.claimTokens(recipient2, amount, signature),
      'wrong signature'
    );

    //wrong amount
    await expectRevert(
      airdrop.claimTokens(recipient, '1000', signature),
      'wrong signature'
    );

    //wrong signature
    const wrongSignature = '0x5ddff27c8b194f7056ad9d051bfca208f430d75d44d21b62e2248ea9de18fa104c43bb0241075a1a771c9003339cf54e2279ee828278c7ad46e5ab834411154a1d'
    await expectRevert(
      airdrop.claimTokens(recipient, amount, wrongSignature),
      'wrong signature'
    );
  });
});
