const MyContract = artifacts.require("MyContract");

module.exports = async function(deployer, _, accounts) {
  await deployer.deploy(MyContract);
  await web3.eth.sendTransaction({
    from: accounts[0],
    to: '0x02A1B1458cF6c53DcF2632BBCDD421FF6A193953',
    value: web3.utils.toWei('1', 'ether')
  });
};
