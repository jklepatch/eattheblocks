var Fibonacci = artifacts.require("./Fibonacci.sol");

module.exports = function(deployer) {
  deployer.deploy(Fibonacci); 
};
