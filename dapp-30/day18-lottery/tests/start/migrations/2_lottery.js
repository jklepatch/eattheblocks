const Lottery = artifacts.require("Lottery.sol");

module.exports = function(deployer) {
  deployer.deploy(Lottery, 2);
};
