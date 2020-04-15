var Wallet = artifacts.require("./Wallet.sol");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(
    Wallet, 
    [accounts[1], accounts[2], accounts[3]],
    2,
    {from: accounts[0], value: 1000}
  );
};
