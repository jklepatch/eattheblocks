const CoinGecko = require('coingecko-api');
const Oracle = artifacts.require('Oracle.sol');

const POLL_INTERVAL = 5000; //5s
const CoinGeckoClient = new CoinGecko();

module.exports = async done => {
  const [_, reporter] = await web3.eth.getAccounts();
  const oracle = await Oracle.deployed();

  while(true) {
    const response = await CoinGeckoClient.coins.fetch('bitcoin', {});
    let currentPrice = parseFloat(response.data.market_data.current_price.usd);
    currentPrice = parseInt(currentPrice * 100);
    await oracle.updateData(
      web3.utils.soliditySha3('BTC/USD'), 
      currentPrice,
      {from: reporter}
    ); 
    console.log(`new price for BTC/USD ${currentPrice} updated on-chain`);
    await new Promise((resolve, _) => setTimeout(resolve, POLL_INTERVAL)); 
  }

  done();
}
