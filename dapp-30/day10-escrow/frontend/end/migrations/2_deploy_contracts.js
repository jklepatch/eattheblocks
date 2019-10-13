var Escrow = artifacts.require("./Escrow.sol");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(
    Escrow, 
    accounts[1], //payer
    accounts[2], //payee 
    1000,
    {from: accounts[0]}
  );
};
