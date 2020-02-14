const MyContract = artifacts.require('MyContract');
const Web3 = require('web3');
web3 = new Web3('ws://localhost:9545');

module.exports = (cb) => {
  MyContract.deployed()
  .then(async contract => {
    const myContract = new web3.eth.Contract(MyContract.abi, contract.address);
    const accounts = await web3.eth.getAccounts();
    let results = undefined;
    myContract.events.DataUpdated({}, console.log);

    //Latest block
    await myContract.methods.updateData('val 1').send({from: accounts[0]});
    await myContract.methods.updateData('val 2').send({from: accounts[0]});
    await myContract.methods.updateData('val 3').send({from: accounts[0]});
    await myContract.methods.updateData('val 4').send({from: accounts[1]});
    await myContract.methods.updateData('val 5').send({from: accounts[2]});

    console.log(results);
    cb();
  })
  .catch(e => {
    console.log(e);
    cb();
  });
};
