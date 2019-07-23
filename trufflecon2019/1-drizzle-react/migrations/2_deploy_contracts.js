const ERC20Token = artifacts.require('ERC20Token');

module.exports = function(deployer) {
  deployer.deploy(ERC20Token);
};
