const YieldFarmer = artifacts.require('../contracts/YieldFarmer.sol');
const ERC20Token = artifacts.require('../contracts/ERC20Token.sol');
const AMOUNT = 100000;

module.exports = async (done) => {
  const yieldFarmer = await YieldFarmer.deployed();
  const dai = await ERC20Token.at('0x6b175474e89094c44da98b954eedeac495271d0f');
  await dai.approve(yieldFarmer.address, AMOUNT); 
  await yieldFarmer.openPosition(AMOUNT);
  done();
}
