const Factory = artifacts.require('UniswapV2Factory.sol');

module.exports = function (deployer, _network, addresses) {
  deployer.deploy(Factory, addresses[0]);
};
