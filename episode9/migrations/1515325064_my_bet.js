var MyBet = artifacts.require("./MyBet.sol");

module.exports = function(deployer) {
  deployer.deploy(MyBet);
};
