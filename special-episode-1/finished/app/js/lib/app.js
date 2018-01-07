const TruffleContract = require('truffle-contract'); 

/**
 * Class representing the application.
 * 
 * Contains references to DOM in `HTML` property, to be used for rendering
 * Contains `web3Provider`, to be used to instantiate `web3` objects
 * Contains `TruffleContract` contract abstractions in the `contracts` key
 * Contains specific instances of contracts (i.e deployed on the network). For
 * `ToDo`, it is simply the key `ToDo`.
 */
class App {
  /**
   * @param {Object} $ - jQuery, to manipulate the DOM
   * @param {Object} Web3 - The web3 library, used to interact with the ethereum network
   * @param {string} provider - the web3 provider to use for building web3 objects
   */
  constructor($, Web3, provider = 'http://localhost:8545') {
    this.setWeb3Provider(Web3, provider);
    this.setHTMLReferences();
    this.contracts = {}; //will hold contract abstractions, not instances
  }

  setWeb3Provider(Web3, provider) {
    this.web3Provider = new Web3.providers.HttpProvider(provider);
  }

  setHTMLReferences() {
    this.HTML = {};
    this.HTML.$contractAddress = $('#contract-address');
    this.HTML.$newTaskContent = $('#task-content');
    this.HTML.$newTaskAuthor = $('#task-author');
    this.HTML.$newTask = $('#new-task');
    this.HTML.$refreshTasks = $('#refresh-task');
    this.HTML.$tasks = $('#tasks');
    this.HTML.$messageWrapper = $('#message-wrapper');
  }

  getContractAbstraction(contractName, contractArtifact) {
    this.contracts[contractName] = TruffleContract(contractArtifact);
    this.contracts[contractName].setProvider(this.web3Provider);
    return this.contracts[contractName];
  }
  
  buildContractInstanceFromAddress(contractName, contractAbstraction, contractAddress) {
    if(!contractAbstraction instanceof TruffleContract) {
      throw new Error('`contractAbstraction` argument is not an instance of `TruffleContract`');
    }
    return new Promise((resolve, reject) => {
      contractAbstraction.at(contractAddress)
      .then((instance) => {
        this[contractName] = instance;
        resolve(instance);
      })
      .catch(function(error) {
        reject(error);
      })
    });
  }

  setAccount(accounts, position = 0) {
    this.account = accounts[position];
  }
  
  static getContractAddressFromArtifact(contractArtifact, position = 0) {
    const key = Object.keys(contractArtifact.networks)[position];
    return contractArtifact.networks[key].address;
  }
}

export {App};