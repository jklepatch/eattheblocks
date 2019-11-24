const StateMachine = artifacts.require("StateMachine.sol");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(
    StateMachine,
    web3.utils.toWei('1'),           //amount
    web3.utils.toWei('1', 'Finney'), //interest. 1000 Finney = 1 Ether
    30,                              //duration (s)
    accounts[1],                     //borrower
    accounts[2],                     //lender
  );
};
