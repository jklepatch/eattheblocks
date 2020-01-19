const CryptoKitty = artifacts.require("CryptoKitty.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoKitty, "https://url-to-your-game-server");
};
