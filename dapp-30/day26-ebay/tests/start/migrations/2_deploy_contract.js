const Ebay = artifacts.require("Ebay");

module.exports = function(deployer) {
  deployer.deploy(Ebay);
};
