const EtherWallet = artifacts.require("EtherWallet");

module.exports = function(deployer) {
  deployer.deploy(EtherWallet);
};
