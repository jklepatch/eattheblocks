import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import artifact from '../../contracts/ToDo.sol';
import config from './config';

const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereumUrl));

const abstraction = new TruffleContract(artifact);
abstraction.setProvider(web3.currentProvider);

const network = Object.keys(artifact.networks)[0];
const address = artifact.networks[network].address;

abstraction.at(address)
  .then((todo) => {
    todo.getTaskIds()
    .then((taskIds) => {
      console.log(taskIds);
    });
  });

web3.eth.getAccounts(console.log);

