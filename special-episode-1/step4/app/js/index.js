console.log('loaded');

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

web3.eth.getAccounts(console.log);
