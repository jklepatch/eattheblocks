const pancakeSwapMainnet = require("./pancakeSwap-mainnet.json");
const apeSwapMainnet = require("./apeSwap-mainnet.json");
const tokensMainnet = require("./tokens-mainnet.json");

//const pancakeSwapTestnet = require('./pancakeSwap-testnet.json');
//const apeSwapTestnet = require('./apeSwap-testnet.json');
//const tokensTestnet = require('./tokens-testnet.json');

module.exports = {
  mainnet: {
    pancakeSwap: pancakeSwapMainnet,
    apeSwap: apeSwapMainnet,
    tokens: tokensMainnet,
  },
  //testnet: {
  //  pancakeSwap: pancakeSwapTestnet,
  //  apeSwap: apeSwapTestnet,
  //  tokens: tokensTestnet
  //}
};
