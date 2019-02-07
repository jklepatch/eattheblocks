import Web3 from 'web3';
import { ethereumUrl } from './config';
//import * as artifact from '../build/contracts/ToDo.json';
let artifact = require('../build/contracts/ToDo.json');
//console.log(_artifact);
//const artifact: object = JSON.parse(_artifact);
//

const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));

const networks = Object.keys(artifact.networks);
const network = networks[networks.length - 1];
const { address } = artifact.networks[network];

const todo = new web3.eth.Contract(artifact.abi, address);

export { web3, todo };
