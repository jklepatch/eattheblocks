const EventContract = artifacts.require("EventContract");

module.exports = function(deployer) {
  deployer.deploy(EventContract);
};
