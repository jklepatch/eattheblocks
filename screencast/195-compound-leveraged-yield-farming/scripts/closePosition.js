const YieldFarmer = artifacts.require('../contracts/YieldFarmer.sol');

module.exports = async (done) => {
  const yieldFarmer = await YieldFarmer.deployed();
  await yieldFarmer.closePosition();
  done();
}
