import Contract = require('web3-eth-contract');

export interface Todo extends Contract.Contract {
  createTask: (content: string, author: string) => Contract.DeployTransactionResponse 
}

export interface Task {
  id: string,
  date: string,
  content: string,
  author: string,
  done: boolean,
  dateComplete: string
}
