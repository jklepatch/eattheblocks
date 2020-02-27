const {
  expectRevert,
} = require('@openzeppelin/test-helpers');
const Dai = artifacts.require('mocks/Dai.sol');
const Bat = artifacts.require('mocks/Bat.sol');
const Rep = artifacts.require('mocks/Rep.sol');
const Zrx = artifacts.require('mocks/Zrx.sol');
const Dex = artifacts.require('Dex.sol');

contract('Dex', (accounts) => {
  let dex, dai, bat, rep, zrx;
  const [trader1, trader2] = [accounts[1], accounts[2]];
  const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX']
    .map(ticker => web3.utils.fromAscii(ticker));

  beforeEach(async() => {
    ([dai, bat, rep, zrx] = await Promise.all([
      Dai.new(), 
      Bat.new(), 
      Rep.new(), 
      Zrx.new()
    ]));
    dex = await Dex.new();
    await Promise.all([
      dex.addToken(DAI, dai.address),
      dex.addToken(BAT, bat.address),
      dex.addToken(REP, rep.address),
      dex.addToken(ZRX, zrx.address)
    ]);

    const amount = web3.utils.toWei('1000');
    await Promise.all(
      [trader1, trader2].map(
        trader => dai.faucet(trader, amount)
      )
    );
    await Promise.all(
      [trader1, trader2].map(
        trader => dai.approve(dex.address, amount, {from: trader})
      )
    );
  });

  it('should deposit tokens', async () => {
    const amount = web3.utils.toWei('100');

    await dex.deposit(
      amount,
      DAI,
      {from: trader1}
    );

    const balance = await dex.traderBalances(trader1, DAI);
    assert(balance.toString() === amount); 
  });

  it('should withdraw tokens', async () => {
    const amount = web3.utils.toWei('100');

    await dex.deposit(
      amount,
      DAI,
      {from: trader1}
    );

    await dex.withdraw(
      amount,
      DAI,
      {from: trader1}
    );

    const [balanceDex, balanceDai] = await Promise.all([
      dex.traderBalances(trader1, DAI),
      dai.balanceOf(trader1)
    ]);
    assert(balanceDex.isZero());
    assert(balanceDai.toString() === web3.utils.toWei('1000')); 
  });

  it('should NOT withdraw tokens if balance too low', async () => {
    await dex.deposit(
      web3.utils.toWei('100'),
      DAI,
      {from: trader1}
    );

    await expectRevert(
      dex.withdraw(
        web3.utils.toWei('1000'),
        DAI,
        {from: trader1}
      ),
      'balance too low'
    );
  });
});
