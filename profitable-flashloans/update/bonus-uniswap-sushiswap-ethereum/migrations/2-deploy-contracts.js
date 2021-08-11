const Flashloan = artifacts.require("Flashloan.sol");
const { mainnet: addresses } = require('../addresses');

module.exports = function(deployer, _network, [beneficiaryAddress, _]) {
  deployer.deploy(
    Flashloan,
    addresses.sushi.router,
    addresses.uniswap.router,
    addresses.tokens.weth,
    addresses.tokens.dai,
    beneficiaryAddress
  );
};
