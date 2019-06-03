var simpleSmartContractABI = [];
var simpleSmartContractAddress = '0xCB2ebb9cE533EA4c8c409a07C3d7829A65E4dbf7';
var web3 = new Web3('http://localhost:9545');
var simpleSmartContract = new web3.eth.Contract(simpleSmartContractABI, simpleSmartContractAddress);

document.addEventListener('DOMContentLoaded', () => {
  web3.eth.getAccounts()
  .then(console.log);
});
