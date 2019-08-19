const Crud = artifacts.require("Crud");

module.exports = function(deployer) {
  deployer.deploy(Crud);
};
