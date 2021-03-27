const UniswapFactoryMock = artifacts.require('UniswapFactoryMock.sol');

module.exports = function (deployer) {
  deployer.deploy(UniswapFactoryMock);
};
