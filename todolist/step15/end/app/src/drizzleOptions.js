import Todo from './contracts/ToDo.json';

const options = {
  contracts: [Todo],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  }
};

export default options;
