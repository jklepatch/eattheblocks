const YieldFarmer = artifacts.require('YieldFarmer.sol');

module.exports = function(deployer) {
  deployer.deploy(YieldFarmer,'0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b');
};
