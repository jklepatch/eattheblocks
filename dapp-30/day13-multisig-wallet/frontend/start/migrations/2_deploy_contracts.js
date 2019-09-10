var Multisig = artifacts.require("./Multisig.sol");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(
    Multisig, 
    [accounts[1], accounts[2], accounts[3]],
    2,
    {from: accounts[0], value: 1000}
  );
};
