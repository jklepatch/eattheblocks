const CoinGecko = require('coingecko-api');
const Web3 = require('web3');

const POLL_INTERVAL = 5000; //5s
const ETHEREUM_URL = 'http://localhost:9545';

const CoinGeckoClient = new CoinGecko();
//const web3 = new Web3(ETHEREUM_URL);

const init = async () => {
  while(true) {
    const data = await CoinGeckoClient.coins.fetch('bitcoin', {});
    console.log(data.market_data.current_price);
    await new Promise((resolve, _) => setTimeout(resolve, POLL_INTERVAL)); 
  }
  console.log('end');
}

init();
