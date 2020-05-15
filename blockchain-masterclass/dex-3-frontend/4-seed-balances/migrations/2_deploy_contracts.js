const Dai = artifacts.require('mocks/Dai.sol');
const Bat = artifacts.require('mocks/Bat.sol');
const Rep = artifacts.require('mocks/Rep.sol');
const Zrx = artifacts.require('mocks/Zrx.sol');
const Dex = artifacts.require("Dex.sol");

const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX']
  .map(ticker => web3.utils.fromAscii(ticker));

module.exports = async function(deployer, _network, accounts) {
  const [trader1, trader2, trader3, trader4, _] = accounts;
  await Promise.all(
    [Dai, Bat, Rep, Zrx, Dex].map(contract => deployer.deploy(contract))
  );
  const [dai, bat, rep, zrx, dex] = await Promise.all(
    [Dai, Bat, Rep, Zrx, Dex].map(contract => contract.deployed())
  );

  await Promise.all([
    dex.addToken(DAI, dai.address),
    dex.addToken(BAT, bat.address),
    dex.addToken(REP, rep.address),
    dex.addToken(ZRX, zrx.address)
  ]);

  const amount = web3.utils.toWei('1000');
  const seedTokenBalance = async (token, trader) => {
    await token.faucet(trader, amount)
    await token.approve(
      dex.address, 
      amount, 
      {from: trader}
    );
    const ticker = await token.name();
    await dex.deposit(
      amount, 
      web3.utils.fromAscii(ticker),
      {from: trader}
    );
  };
  await Promise.all(
    [dai, bat, rep, zrx].map(
      token => seedTokenBalance(token, trader1) 
    )
  );
  await Promise.all(
    [dai, bat, rep, zrx].map(
      token => seedTokenBalance(token, trader2) 
    )
  );
  await Promise.all(
    [dai, bat, rep, zrx].map(
      token => seedTokenBalance(token, trader3) 
    )
  );
  await Promise.all(
    [dai, bat, rep, zrx].map(
      token => seedTokenBalance(token, trader4) 
    )
  );
};
