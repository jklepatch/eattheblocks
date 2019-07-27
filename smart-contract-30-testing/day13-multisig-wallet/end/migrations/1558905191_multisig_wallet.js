const Wallet = artifacts.require("Wallet");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(
    Wallet, 
    [accounts[0], accounts[1], accounts[2]], 
    2,
    {value: 1000}
  );
};
