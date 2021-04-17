const ETBToken = artifacts.require('ETBToken.sol');

module.exports = function (deployer) {
  deployer.deploy(ETBToken);
};
