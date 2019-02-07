import ContractT = require('web3-eth-contract');

export interface Todo extends ContractT.Contract {
  createTask: (content: string, author: string) => ContractT.DeployTransactionResponse 
}

export interface Task {
  id: string,
  date: string,
  content: string,
  author: string,
  done: boolean,
  dateComplete: string
}
