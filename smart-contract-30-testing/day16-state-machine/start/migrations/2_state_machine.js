const StateMachine = artifacts.require("StateMachine");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(StateMachine, 
    10, 
    1, 
    2,
    accounts[1],
    accounts[2]
  );
};
