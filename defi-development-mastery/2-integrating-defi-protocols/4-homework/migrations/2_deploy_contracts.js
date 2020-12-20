const MyDeFiProject = artifacts.require("MyDeFiProject.sol");

module.exports = function (deployer, network) {
  let comptrollerAddress, priceOracleProxy;
  if(network === 'rinkeby') {
    comptrollerAddress = '0x2eaa9d77ae4d8f9cdd9faacd44016e746485bddb';
    priceOracleProxy = '0x5722A3F60fa4F0EC5120DCD6C386289A4758D1b2';
  }
  deployer.deploy(MyDeFiProject, comptrollerAddress, priceOracleProxy);
};
