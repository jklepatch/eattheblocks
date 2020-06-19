const config = require('../config.js');

class BlockchainClient {
  constructor(web3) {
    this.web3 = web3;
    //@Todo: instantiate kyber
    //@Todo: instantiate Uniswap
    this.kyber = new web3.eth.Contract(
      config.KYBER_ABI,
      config.KYBER_ADDRESS
    );

const uniswap = web3.eth.Contract(
  UniswapABI,
  UniswapAddress
);
  }

  poll(onData, onError) {
    this.web3.eth.subscribe('newBlockHeaders')
      .on('data', onData)
      .on('error', onError); 
  }

  getQuotes() {
    return {
      kyber,
      uniswap
    }
  }

  runArbitrage() {
  }
}

export default BlockchainClient;
