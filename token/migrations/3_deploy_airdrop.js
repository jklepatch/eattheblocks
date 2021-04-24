const ETBToken = artifacts.require('ETBToken.sol');
const Airdrop = artifacts.require('Airdrop.sol');

module.exports = async function (deployer) {
  const token = await ETBToken.deployed();
  await deployer.deploy(Airdrop, token.address);
  const airdrop = await Airdrop.deployed();
  await token.transfer(airdrop.address, web3.utils.toWei('100000'));
};
