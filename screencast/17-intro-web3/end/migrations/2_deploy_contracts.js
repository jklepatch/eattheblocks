var Dai = artifacts.require("Dai.sol");

module.exports = function(deployer) {
  deployer.deploy(Dai, 'Dai Stablecoin v1', 'DAI', 18);
};
