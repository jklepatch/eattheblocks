const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json');

const init = async () => {
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      'http://localhost:9545'
    )
  );
  
  const id = await web3.eth.net.getId();
  const deployedNetwork = MyContract.networks[id];
  const contract = new web3.eth.Contract(
    MyContract.abi,
    deployedNetwork.address
  );

  const addresses = await web3.eth.getAccounts();
  await contract.methods
    .emitEvent('hey')
    .send({
      from: addresses[0]
  });

  contract.events.MyEvent({fromBlock: 0})
    .on('data', event => console.log(event));

  await new Promise(resolve => setTimeout(() => resolve(), 2000)); 

  await contract.methods
    .emitEvent('hey hey')
    .send({
      from: addresses[0]
  });
}

init();
