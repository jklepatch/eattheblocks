const Deed = artifacts.require("Deed");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(Deed, accounts[0], accounts[1], 60);
};
