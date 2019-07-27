const Fibonacci = artifacts.require("Fibonacci");

module.exports = function(deployer) {
  deployer.deploy(Fibonacci);
};
