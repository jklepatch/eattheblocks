const BFactory = artifacts.require('IBFactory.sol');
const BPool = artifacts.require('IBPool.sol');
const TokenA = artifacts.require('TokenA.sol');
const TokenB = artifacts.require('TokenB.sol');
const TokenC = artifacts.require('TokenC.sol');
const { bFactory as bFactoryAddress } = require('../addresses-kovan.js');

module.exports = async () => {
  const accounts = web3.eth.getAccounts();

  const tokenA = await TokenA.new(); 
  const tokenB = await TokenB.new(); 
  const tokenC = await TokenC.new(); 

  bFactory = await BFactory.at(bFactoryAddress);
  const poolAddress = await bFactory.newPool().call();
  await bFactory.newPool();
  const bPool = await BPool.at(poolAddress);

  const amountA = web3.utils.toWei('2000');
  const amountB = web3.utils.toWei('2000');
  const amountC = web3.utils.toWei('6000');
  await tokenA.faucet(accounts[0], amountA);
  await tokenB.faucet(accounts[0], amountB);
  await tokenC.faucet(accounts[0], amountC);
  await tokenA.approve(poolAddress, );
  await tokenB.approve(poolAddress, );
  await tokenC.approve(poolAddress, );
  await bPool.bind(tokenA.address, amountA, 20);
  await bPool.bind(tokenA.address, amountB, 20);
  await bPool.bind(tokenA.address, amountC, 60);


  await bFactory.setController(CONTROLLER_ADDRESS):
}
