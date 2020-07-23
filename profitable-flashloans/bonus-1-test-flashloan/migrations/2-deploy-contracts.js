const Flashloan = artifacts.require("Flashloan.sol");
const TestArbitrage = artifacts.require("TestArbitrage.sol");
const VaultManager = artifacts.require("VaultManager.sol");
const DaiFaucet = artifacts.require("DaiFaucet.sol");
const allAddresses = require('../addresses');

module.exports = async function(deployer, network, [beneficiaryAddress, _]) {
  const addresses = allAddresses[
    network
      .replace('-fork', '')
      .replace('Fork', '')
  ];

  if(network === 'mainnetFork') {
    await deployer.deploy(VaultManager);
    await deployer.deploy(DaiFaucet, addresses.tokens.dai);
    const daiFaucet = await DaiFaucet.deployed();
    await deployer.deploy(
      Flashloan,
      addresses.kyber.kyberNetworkProxy,
      addresses.uniswap.router,
      addresses.tokens.weth,
      addresses.tokens.dai,
      daiFaucet.address,
      beneficiaryAddress
    );
  } else {
    await deployer.deploy(
      TestArbitrage,
      addresses.kyber.kyberNetworkProxy,
      addresses.uniswap.router,
      addresses.tokens.weth,
      addresses.tokens.dai,
    );
  }
};
