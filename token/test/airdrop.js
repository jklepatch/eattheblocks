const Token = artifacts.require('ETBToken.sol');
const Airdrop = artifacts.require('Airdrop.sol');

contract('Airdrop', () => {
  let token, airdrop;

  before(async () => {
    token = await Token.deployed();
    airdrop = await Airdrop.at(await token.airdrop());
  });

  it('Should Airdrop 4', async () => {
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
    const tx = await airdrop.getTokens(recipient, amount, signature);
    console.log(`Gas used: ${tx.receipt.gasUsed}`);
    const balance = await token.balanceOf(recipient); 
    assert(balance.eq(web3.utils.toBN(amount)));
  });
});
