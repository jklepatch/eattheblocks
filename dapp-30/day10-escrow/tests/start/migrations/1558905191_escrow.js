const Escrow = artifacts.require("Escrow");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(Escrow, accounts[1], accounts[2], 1000);
};
