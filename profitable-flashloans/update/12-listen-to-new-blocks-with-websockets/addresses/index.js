const pancakeSwapMainnet = require('./pancakeSwap-mainnet.json');
const bakerySwapMainnet = require('./bakerySwap-mainnet.json');
const tokensMainnet = require('./tokens-mainnet.json');
module.exports = {
  mainnet: {
    pancakeSwap: pancakeSwapMainnet,
    bakerySwap: bakerySwapMainnet,
    tokens: tokensMainnet
  }
};
