const ERC721Token = artifacts.require("ERC721Token");

module.exports = function(deployer) {
  deployer.deploy(ERC721Token);
};
