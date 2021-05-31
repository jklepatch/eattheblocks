const SafemoonFork = artifacts.require('SafemoonFork.sol');

module.exports = function (deployer, network) {
  if(network === 'bscTestnet') {
    deployer.deploy(SafemoonFork, '0xD99D1c33F9fC3444f8101754aBC46c52416550D1');
  } else {
    deployer.deploy(SafemoonFork, '0x10ED43C718714eb63d5aA57B78B54704E256024E');
  }
};
