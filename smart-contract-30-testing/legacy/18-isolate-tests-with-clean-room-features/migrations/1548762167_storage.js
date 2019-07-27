const Storage = artifacts.require("Storage");

module.exports = function(deployer) {
  deployer.deploy(Storage);
};
