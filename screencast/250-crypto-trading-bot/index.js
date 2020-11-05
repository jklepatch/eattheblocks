require('dotenv').config();
const ccxt = require('ccxt');
const axios = require("axios");

const tick = async (config, binanceClient) => {
  const { asset, base, spread, allocation } = config;
  const market = `${asset}/${base}`;

  // Cancel open orders left from previou tick, if any
  const orders = await binanceClient.fetchOpenOrders(market);
  orders.forEach(async order => {
    await binanceClient.cancelOrder(order.id);
  });

  // Fetch current market prices
  const results = await Promise.all([
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd')
  ]);
  const marketPrice = results[0].data.bitcoin.usd / results[1].data.tether.usd;

  // Calculate new orders parameters
  const sellPrice = marketPrice * (1 + spread);
  const buyPrice = marketPrice * (1 - spread);
  const balances = await binanceClient.fetchBalance();
  const assetBalance = balances.free[asset]; // e.g. 0.01 BTC
  const baseBalance = balances.free[base]; // e.g. 20 USDT
  const sellVolume = assetBalance * allocation;
  const buyVolume = (baseBalance * allocation) / marketPrice;

  //Send orders
  await binanceClient.createLimitSellOrder(market, sellVolume, sellPrice);
  await binanceClient.createLimitBuyOrder(market, buyVolume, buyPrice);

  console.log(`
    New tick for ${market}...
    Created limit sell order for ${sellVolume}@${sellPrice}  
    Created limit buy order for ${buyVolume}@${buyPrice}  
  `);
};

const run = () => {
  const config = { 
    asset: "BTC",
    base: "USDT",
    allocation: 0.1,     // Percentage of our available funds that we trade
    spread: 0.2,         // Percentage above and below market prices for sell and buy orders 
    tickInterval: 2000  // Duration between each tick, in milliseconds
  };
  const binanceClient = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET
  });
  tick(config, binanceClient);
  setInterval(tick, config.tickInterval, config, binanceClient);
};

run();
