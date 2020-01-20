const CryptoKitty = artifacts.require("CryptoKitty.sol");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoKitty, "https://robohash.org");
  const game = await CryptoKitty.deployed();
  await Promise.all([ 
    game.mint(),
    game.mint(),
    game.mint(),
    game.mint()
  ]);
};
