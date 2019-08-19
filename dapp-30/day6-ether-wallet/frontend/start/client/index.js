import EtherWallet from '../build/contracts/EtherWallet.json';
import Web3 from 'web3';

const web3 = new Web3('http://localhost:9545');
const deploymentKey = Object.keys(EtherWallet.networks)[0];
const etherWallet = new web3.eth.Contract(
  EtherWallet.abi, 
  EtherWallet.networks[deploymentKey].address
);

document.addEventListener('DOMContentLoaded', () => {
});
