import SplitPayment from '../build/contracts/SplitPayment.json';
import Web3 from 'web3';

const web3 = new Web3('http://localhost:9545');
const deploymentKey = Object.keys(SplitPayment.networks)[0];
const splitPayment = new web3.eth.Contract(
  SplitPayment.abi, 
  SplitPayment.networks[deploymentKey].address
);

document.addEventListener('DOMContentLoaded', () => {
});
