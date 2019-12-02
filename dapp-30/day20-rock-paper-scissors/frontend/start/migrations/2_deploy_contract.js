const RockPaperScissors = artifacts.require("RockPaperScissors.sol");

module.exports = function(deployer) {
  deployer.deploy(RockPaperScissors);
};
