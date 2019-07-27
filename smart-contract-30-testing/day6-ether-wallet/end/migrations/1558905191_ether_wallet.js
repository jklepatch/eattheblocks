const EtherWallet = artifacts.require("EtherWallet");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(EtherWallet, accounts[0]);
};
