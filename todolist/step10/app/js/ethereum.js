import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import { ethereumUrl } from './config';
import artifact from '../../contracts/ToDo.sol';

const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));

const networks = Object.keys(artifact.networks);
const network = networks[networks.length - 1];
const { address } = artifact.networks[network];

const Todo = new TruffleContract(artifact);
Todo.setProvider(web3.currentProvider);
const todo = Todo.at(address);

export default { web3, todo };
