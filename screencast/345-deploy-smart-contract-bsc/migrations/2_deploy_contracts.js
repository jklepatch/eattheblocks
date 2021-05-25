const ContractA = artifacts.require('ContractA.sol');
const ContractB = artifacts.require('ContractB.sol');

module.exports = async function (deployer, network, accounts) {
  const [admin, _] = accounts;

  if(network === 'bscTestnet' || network === 'develop') {
    await deployer.deploy(ContractA, admin);
    const contractA = await ContractA.deployed();
    await deployer.deploy(ContractB, admin, contractA.address);
  }

  if(network === 'bsc') {
    //Deployment logic for mainnet
  }
};
