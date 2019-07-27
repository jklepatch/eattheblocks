const DAO = artifacts.require("DAO");

module.exports = function(deployer) {
  deployer.deploy(DAO, 2, 2, 50);
};
