const BridgeEth = artifacts.require('./BridgeEth.sol');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  await bridgeEth.burn(recipient, 1000);
  done();
}
