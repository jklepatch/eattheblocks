const Weth = artifacts.require("Weth.sol");

module.exports = function (deployer) {
  deployer.deploy(Weth);
};
