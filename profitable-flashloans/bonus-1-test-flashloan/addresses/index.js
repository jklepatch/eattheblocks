const kyberMainnet = require('./kyber-mainnet.json');
const uniswapMainnet = require('./uniswap-mainnet.json');
const dydxMainnet = require('./dydx-mainnet.json');
const tokensMainnet = require('./tokens-mainnet.json');
const makerdaoMainnet = require('./makerdao-mainnet.json');

const kyberKovan = require('./kyber-kovan.json');
const uniswapKovan = require('./uniswap-kovan.json');
const dydxKovan = require('./dydx-kovan.json');
const tokensKovan = require('./tokens-kovan.json');
const makerdaoKovan = require('./makerdao-kovan.json');

module.exports = {
  mainnet: {
    kyber: kyberMainnet,
    uniswap: uniswapMainnet,
    dydx: dydxMainnet,
    tokens: tokensMainnet,
    makerdao: makerdaoMainnet
  },
  kovan: {
    kyber: kyberKovan,
    uniswap: uniswapKovan,
    dydx: dydxKovan,
    tokens: tokensKovan,
    makerdao: makerdaoKovan
  }
};
