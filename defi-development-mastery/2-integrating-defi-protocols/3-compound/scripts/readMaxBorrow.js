const MyDeFiProject = artifacts.require('MyDeFiProject.sol');
const Token = artifacts.require('Token.sol');

const cBatAddress = '0xebf1a11532b93a529b5bc942b4baa98647913002'; 

module.exports = async done => {
  const myDeFiProject = await MyDeFiProject.deployed();
  const maxBorrow = await myDeFiProject.readMaxBorrow(cBatAddress);
  console.log(`Max Bat Balance: ${web3.utils.fromWei(maxBorrow)}`);
  done();
}
