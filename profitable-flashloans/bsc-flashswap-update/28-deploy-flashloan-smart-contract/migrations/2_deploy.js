const Arbitrage = artifacts.require("FlashSwap");

module.exports = function (deployer) {
  deployer.deploy(
    Arbitrage,
    "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", //pancakefactory
    "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6", //apefactory
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", //WBNB Token  BSC's Weth
    "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7", //aperouter
    "0x10ED43C718714eb63d5aA57B78B54704E256024E" //pancakerouter
    " 0xYOURADDRESSHERE"// Beneficiary  Needs to be filled by you with deployment address
  );
};
