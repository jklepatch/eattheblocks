const SafemoonFork = artifacts.require('SafemoonFork.sol');

module.exports = function (deployer) {
  deployer.deploy(SafemoonFork);
};
