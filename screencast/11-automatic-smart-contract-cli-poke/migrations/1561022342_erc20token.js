const ERC20Token = artifacts.require('ERC20Token');

module.exports = function(deployer) {
  deployer.deploy(ERC20Token,
    "My token",
    "TTT",
    10 ^ 18,
    100000
  );
};
