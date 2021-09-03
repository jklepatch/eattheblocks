const Arbitrage = artifacts.require("FlashSwap");

module.exports = function (deployer) {
  deployer.deploy(
    Arbitrage,
    '0xBCfCcbde45cE874adCB698cC183deBcF17952812', 
    '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7', 
    '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    '0xaEbdb273176475A33D295070726e7d0A3C5a6486'  
    );
};