import contractArtifact from '../build/contracts/Storage.json';

var abi = contractArtifact.abi;
var deployments = Object.keys(contractArtifact.networks);
var address = contractArtifact.networks[deployments[deployments.length - 1]];
var web3 = new Web3('http://localhost:9545');
var contract = new web3.eth.Contract(abi, address);
// use `contract` to interact with smart contract
    
