const SplitPayment = artifacts.require("SplitPayment");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(SplitPayment, accounts[0]);
};
