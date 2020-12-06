const TruffleContract = require('TruffleContract');
const MyContract = artifacts.require('MyContract.sol');

module.exports = function() {
  //Dont think this is correct. See how to instantiate a pointer to an alrady deployed contract
  const dai = await TruffleContract.at('address of DAI');
  const myContract = await MyContract.deployed();
  dai.approve(myContract.address);
}
