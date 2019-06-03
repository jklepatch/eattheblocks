const Strings = artifacts.require("Strings");

module.exports = function(deployer) {
  deployer.deploy(Strings);
};
