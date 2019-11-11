const EventContract = artifacts.require("EventContract.sol");

module.exports = function(deployer) {
  deployer.deploy(EventContract);
};
