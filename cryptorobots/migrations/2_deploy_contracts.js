const CryptoRobots = artifacts.require("./CryptoRobots.sol");
const Marketplace = artifacts.require("./Marketplace.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoRobots);
  deployer.deploy(Marketplace);
};
