const Voting = artifacts.require("Voting");

module.exports = async function(deployer) {
  deployer.deploy(Voting);
};
