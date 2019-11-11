import Web3 from "web3";
import ERC20Token from './contracts/ERC20Token.json';

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:9545"),
  },
  contracts: [ERC20Token],
  events: {
    ERC20Token: ['Transfer', 'Approval'], 
  },
};

export default options;
