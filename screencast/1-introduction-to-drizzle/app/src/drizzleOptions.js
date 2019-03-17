import Storage from './contracts/Storage.json';

const options = {
  contracts: [Storage],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  }
};

export default options;

