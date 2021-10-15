const flashloan = artifacts.require("Flashloan.sol");

module.exports = function (deployer) {
  deployer.deploy(
    flashloan,
    '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', //PancakeSwap factory
    '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F', //BakerySwap router
    '0x10ED43C718714eb63d5aA57B78B54704E256024E'  //PancakeSwap router 
    );
};
