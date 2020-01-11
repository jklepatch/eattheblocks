import ERC721Token from './contracts/ERC721Token.json';

const options = {
  contracts: [ERC721Token],
  events: {
    ERC721Token: ['Transfer', 'Approval'], 
  },
};

export default options;
