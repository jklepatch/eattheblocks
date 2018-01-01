import {maybeConvertToNumber} from './utils.js';

/**
 * Class representing a task
 * 
 * Can be instantiated with an Array (i.e what is returned from smart contract)
 * Or can be instantiated with an object
 */
class Task {
  constructor(arg) {
    //This is for instantiation with data coming from our smart contract.
    //In this case its probably a Task which already exist on the blockchain
    if(arg instanceof Array) {
      this.id = maybeConvertToNumber(arg[0]);
      this.date = new Date(maybeConvertToNumber(arg[1]));
      this.content = arg[2];
      this.author = arg[3];
      this.done = arg[4];
      return;
    }
    //Otherwise, if we pass an object, it means we create a brand new Task
    //that doesnt exist yet in our smart contract
    const {id = 0, date = new Date(), content, author, done = false} = arg;
    this.id = maybeConvertToNumber(id);
    this.date = new Date(maybeConvertToNumber(date));
    this.content = content;
    this.author = author;
    this.done = done;
  }
}

export {Task};