const Tweeter = artifacts.require("Tweeter");

module.exports = function(deployer) {
  deployer.deploy(Tweeter);
};
