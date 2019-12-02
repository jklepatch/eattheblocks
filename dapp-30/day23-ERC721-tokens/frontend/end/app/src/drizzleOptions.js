import Web3 from "web3";
import ERC721Token from './contracts/ERC721Token.json';

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:9545"),
  },
  contracts: [ERC721Token],
  events: {
    ERC721Token: ['Transfer', 'Approval'], 
  },
};

export default options;
