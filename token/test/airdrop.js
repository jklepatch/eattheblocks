const { expectRevert } = require('@openzeppelin/test-helpers');
const Token = artifacts.require('ETBToken.sol');
const Airdrop = artifacts.require('Airdrop.sol');

contract('Airdrop', ([admin, _]) => {
  let token, airdrop;
  const TOTAL_SUPPLY = web3.utils.toWei('1000000');
  const AIRDROP = web3.utils.toWei('100000');

  beforeEach(async () => {
    token = await Token.new();
    airdrop = await Airdrop.new(token.address);
    await token.transfer(airdrop.address, AIRDROP); 
  });

  const createSignature = params => {
    const { address: defaultRecipient } = web3.eth.accounts.create();
    params = {recipient: defaultRecipient, amount: 100, ...params};
    const message = web3.utils.soliditySha3(
      {t: 'address', v: params.recipient},
      {t: 'uint256', v: params.amount}
    ).toString('hex');
    const privKey = '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
    const { signature } = web3.eth.accounts.sign(
      message, 
      privKey
    );
    return { signature, recipient: params.recipient, amount: params.amount };
  };

  it('Should airdrop', async () => {
    const { signature, recipient, amount } = createSignature();
    await airdrop.claimTokens(recipient, amount, signature);
    const balance = await token.balanceOf(recipient); 
    assert(balance.eq(web3.utils.toBN(amount)));
  });

  it('Should not airdrop twice for same address', async () => {
    const { signature, recipient, amount } = createSignature();
    await airdrop.claimTokens(recipient, amount, signature),
    await expectRevert(
      airdrop.claimTokens(recipient, amount, signature),
      'airdrop already processed'
    );
  });

  it('Should not airdrop above airdrop limit', async () => {
    const { signature, recipient, amount } = createSignature({
      amount: web3.utils.toWei('100001')
    });
    await expectRevert(
      airdrop.claimTokens(recipient, amount, signature),
      'airdropped 100% of the tokens'
    );
  });

  it('Should not airdrop if wrong recipient', async () => {
    const { signature, recipient, amount } = createSignature();
    const { address: wrongRecipient} = web3.eth.accounts.create();
    await expectRevert(
      airdrop.claimTokens(wrongRecipient, amount, signature),
      'wrong signature'
    );
  });

  it('Should not airdrop if wrong amount', async () => {
    const { signature, recipient, amount } = createSignature();
    const wrongAmount = '123';
    await expectRevert(
      airdrop.claimTokens(recipient, wrongAmount, signature),
      'wrong signature'
    );
  });

  it('Should not airdrop if wrong signature', async () => {
    const { signature, recipient, amount } = createSignature();
    const wrongSignature = '0x5ddff27c8b194f7056ad9d051bfca208f430d75d44d21b62e2248ea9de18fa104c43bb0241075a1a771c9003339cf54e2279ee828278c7ad46e5ab834411154a1d'
    await expectRevert(
      airdrop.claimTokens(recipient, amount, wrongSignature),
      'wrong signature'
    );
  });
});
