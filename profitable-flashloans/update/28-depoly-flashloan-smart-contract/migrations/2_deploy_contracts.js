const flashloan = artifacts.require("Flashloan.sol");

module.exports = function (deployer) {
  deployer.deploy(
    flashloan,
    '0xBCfCcbde45cE874adCB698cC183deBcF17952812', //PancakeSwap factory
    '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F', //BakerySwap router
    '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F'  //PancakeSwap router 
    );
};
