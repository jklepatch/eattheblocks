artifact = {}; // replace {} by content of build/contracts/ToDo.json, after deploying

console.log('loaded');

// Instantiate web3
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
web3.eth.getAccounts(console.log);

// Create contract abstraction
abstraction = new TruffleContract(artifact);
abstraction.setProvider(web3.currentProvider);

// Create contract instance
network = Object.keys(artifact.networks)[0];
address = artifact.networks[network].address;
abstraction.at(address)
.then((todo) => {
  todo.getTaskIds()
  .then((taskIds) => {
    console.log(taskIds);
  });
});
