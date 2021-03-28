const Token = artifacts.require('ETBToken.sol');
//const Airdrop = artifacts.require('Aidrop.sol');

module.exports = function (deployer) {
  deployer.deploy(Token);
  //const token = await Token.deployed();
  //await deployer.deploy(Airdrop);
  //const airdrop = await Airdrop.deployed();
  //await token.updateAirdrop(
};
