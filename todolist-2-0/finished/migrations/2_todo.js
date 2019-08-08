var Todo = artifacts.require("./Todo.sol");

module.exports = function(deployer) {
  deployer.deploy(Todo);
};
