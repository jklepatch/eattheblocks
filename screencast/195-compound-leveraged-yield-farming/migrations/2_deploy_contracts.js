const YieldFarmer = artifacts.require("YieldFarmer");

module.exports = function(deployer) {
  deployer.deploy(
    YieldFarmer,
    '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b', //comptroller
    '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643' //cDai
    '0x6b175474e89094c44da98b954eedeac495271d0f' //dai
  );
};
