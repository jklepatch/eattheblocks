const Dex = artifacts.require("Dex");

module.exports = function(deployer) {
  deployer.deploy(Dex);
};
