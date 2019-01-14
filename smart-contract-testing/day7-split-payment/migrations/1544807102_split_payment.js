const SplitPayment = artifacts.require('SplitPayment');
module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(SplitPayment, accounts[0]);
};
