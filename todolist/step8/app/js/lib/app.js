import $ from 'jquery'; 
import Web3 from 'web3'; 
import TruffleContract from 'truffle-contract'; 
import artifact from '../../../contracts/ToDo.sol'; 
import { renderTasks } from './render';
import { getAccount, getTasks } from './actions';

class App { 
  constructor(config) { 
    this.config = config; 
  }

  setup() { 
    const { ethereumUrl } = this.config; 
    const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));

    const Todo = new TruffleContract(artifact);
    Todo.setProvider(web3.currentProvider);

    const networks = Object.keys(artifact.networks);
    const network = networks[networks.length - 1];
    const address = artifact.networks[network].address;

    this.web3 = web3;
    this.address = address;
    this.Todo = Todo;
    this.$tasks = $('#tasks');
    this.$newTask = $('#new-task');
    this.$taskContent = $('#task-content'); 
    this.$taskAuthor = $('#task-author');

    return new Promise((resolve, reject) => {
      getAccount(this.web3)
      .then((account) => {
        this.account = account;
        return Todo.at(address);
      })
      .then((todo) => {
         this.todo = todo;
         resolve(todo);
      })
      .catch((error) => {
        reject(error);
      });
    });   
  }

  init() { 
    this.$newTask.on('submit', (event) => {
      event.preventDefault();

      this.todo.createTask(
        this.$taskContent.val(), 
        this.$taskAuthor.val(), 
        {from: this.account, gas: 1000000}
      ).then(() => {
        console.log('Task created!');
      })
      .catch((error) => {
        console.log(`Oops... There was an error: ${error}`);
      });
    });

    return new Promise((resolve, reject) => { 
      getTasks(this.todo)
      .then((tasks) => { 
        renderTasks(this.$tasks, tasks);  
      }); 
    }); 
  } 
}

export default App;
