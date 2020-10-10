const LpToken = artifacts.require('LpToken.sol');
const BonusToken = artifacts.require('BonusToken.sol');
const LiquidityMining = artifacts.require('LiquidityMining.sol');

module.exports = async function (deployer) {
  await deployer.deploy(LpToken);
  const lpToken = await LpToken.deployed();

  await deployer.deploy(BonusToken);
  const bonusToken = await BonusToken.deployed();

  await deployer.deploy(LiquidityMining, lpToken.address, bonusToken.address);
  const liquidityMining = await LiquidityMining.deployed();
  await bonusToken.transferOwnership(liquidityMining.address);
};
