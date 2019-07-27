const SimpleSmartContract = artifacts.require("SimpleSmartContract");

module.exports = function(deployer) {
  deployer.deploy(SimpleSmartContract);
};
