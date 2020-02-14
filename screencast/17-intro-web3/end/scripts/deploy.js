const Web3 = require('web3');

const web3 = new Web3('http://localhost:9545'); //Same as Web3(Web3.HttpProvider('http://localhost:9545'))

async function run() {
  const id = await web3.eth.getId(); 
  console.log(id);
  const accounts = await web3.eth.getAccounts(); 
  console.log(accounts);
  const balance = await web3.eth.getBalance(accounts[0]); 
  console.log(balance);
}

run()
