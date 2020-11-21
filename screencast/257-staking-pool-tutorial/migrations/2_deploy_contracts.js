const StakingPool = artifacts.require("StakingPool.sol");

module.exports = function (deployer) {
  deployer.deploy(StakingPool);
};
