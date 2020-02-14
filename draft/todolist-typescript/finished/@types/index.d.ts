import ContractT = require('web3-eth-contract');

interface Todo extends ContractT.Contract {
  createTask: (content: string, author: string) => ContractT.DeployTransactionResponse 
}

declare interface Task {
  id: number,
  date: string,
  content: string,
  author: string,
  done: boolean,
  dateCompote: string
}
