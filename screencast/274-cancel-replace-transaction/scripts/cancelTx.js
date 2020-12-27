const MyContract = artifacts.require('MyContract.sol');

module.exports = async done => {
  try {
    const [account, _] = await web3.eth.getAccounts();
    const txCount = await web3.eth.getTransactionCount(account);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
      MyContract.abi,
      MyContract.networks[networkId].address
    );
    myContract.methods.setData(1).send({
      from: account,
      gasPrice: web3.utils.toWei('20', 'gwei'),
      nonce: txCount
    });
    await web3.eth.sendTransaction({
      from: account,
      to: account,
      value: 0,
      nonce: txCount,
      gasPrice: web3.utils.toWei('21', 'gwei') 
    });

    const data = await myContract.methods.data().call();
    console.log(data.toString());
  } catch(e) {
    console.log(e);
  }
  done();
}
