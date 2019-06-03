const Escrow = artifacts.require("Escrow");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(Escrow, accounts[0], accounts[1], 1000);
};
