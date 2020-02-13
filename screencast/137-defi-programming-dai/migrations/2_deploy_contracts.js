const Dai = artifacts.require("Dai");
const MyDeFiProject = artifacts.require("MyDeFiProject");

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(Dai);
  const dai = await Dai.deployed();
  await deployer.deploy(MyDeFiProject, dai.address);
  const myDeFiProject = await MyDeFiProject.deployed();
  await dai.faucet(myDeFiProject.address, 100);
  await myDeFiProject.foo(accounts[1], 100);

  const balance0 = await dai.balanceOf(myDeFiProject.address);
  const balance1 = await dai.balanceOf(accounts[1]);

  console.log(balance0.toString());
  console.log(balance1.toString());


  //1. Use Kovan faucet to get some Kovan ether
  //2. Use Oasis interface to get some Dai
  //3. migration script: deploy your smart contract (MyDeFiProject)
  //4. send this smart contract some Dai
  //5. execute the foo() function of your smart contract
};
