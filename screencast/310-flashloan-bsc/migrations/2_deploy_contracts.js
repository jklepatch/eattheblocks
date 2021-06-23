const Arbitrage = artifacts.require("Arbitrage.sol");

module.exports = function (deployer) {
  deployer.deploy(
    Arbitrage,
    '0xBCfCcbde45cE874adCB698cC183deBcF17952812', //PancakeSwap factory
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5', //BakerySwap router
  );
};
