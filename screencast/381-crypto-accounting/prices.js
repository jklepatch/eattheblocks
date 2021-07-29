const moment = require('moment');
const { CoinGeckoClient } = require('coingecko-api-v3');

const client = new CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});

const sleep = timeout => {
  return new Promise((resolve, _) => setTimeout(resolve, timeout));
};

const isExpense = tx => {
  return tx.from.toLowerCase() === process.env.ADDRESS.toLowerCase();
};

const init = async (txs) => {
  const txWithPrices = [];
  for (const tx of txs){
    const date = moment.unix(tx.timeStamp).format('DD-MM-YYYY');
    const prices = await client.coinIdHistory({
      id: 'ethereum',
      date
    });
    const ethPrice = parseInt(prices.market_data.current_price.usd);
    const sign = isExpense(tx) ? -1 : +1; 
    const cashflowAssetUSD = tx.assetName === 'ETH' ? sign * tx.value * ethPrice : sign * tx.value;
    const cashflowTxFeeUSD = isExpense(tx) ? - tx.gasUsed * tx.gasPrice * ethPrice / 10 ** 18 : 0;
    const PL = cashflowAssetUSD + cashflowTxFeeUSD;
    txWithPrices.push([
      tx.hash,
      date,
      tx.from,
      tx.to,
      tx.value,
      tx.assetName,
      tx.assetAddress,
      tx.gasUsed,
      tx.gasPrice,
      cashflowAssetUSD,
      cashflowTxFeeUSD,
      PL
    ]);
    await sleep(200);
  }
  return txWithPrices;
};

module.exports = init;
