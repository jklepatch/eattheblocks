const ccxt = require('ccxt');
const axios = require("axios");

const API_KEY = "";
const SECRET = "";
const GLOBAL_PRICE_API = 'https://api.cryptonator.com/api/ticker';

const tick = async (config, blockBidClient) => {
  const { asset, base, spread, allocation } = config;
  const market = `${asset}/${base}`;

  // Cancel open orders left from previou tick, if any
  const orders = await blockbidClient.fetchOpenOrders(market);
  orders.forEach(async order => {
    await blockbidClient.cancelOrder(order.id);
  });

  // Fetch current market prices
  const url = `${GLOBAL_PRICE_API}/${asset}-${base}`;
  const response = await axios(url);
  const marketPrice = response.data.ticker.price;

  // Calculate new orders parameters
  const sellPrice = marketPrice * (1 + spread);
  const buyPrice = marketPrice * (1 - spread);
  const balances = await blockbidClient.fetchBalance();
  const assetBalance = balances.free[asset]; // e.g. 0.01 BTC
  const baseBalance = balances.free[base]; // e.g. 30 TUSD
  const sellVolume = assetBalance * allocation;
  const buyVolume = (baseBalance * allocation) / marketPrice;

  //Send orders
  await blockbidClient.createLimitSellOrder(market, sellVolume, sellPrice);
  await blockbidClient.createLimitBuyOrder(market, buyVolume, buyPrice);

  console.log(`
    New tick for ${market}...
    Created limit sell order for ${sellVolume}@${sellPrice}  
    Created limit buy order for ${buyVolume}@${buyPrice}  
  `);
};

const run = () => {
  const config = { 
    asset: "BTC",
    base: "TUSD",
    allocation: 0.1,     // Percentage of our available funds that we trade
    spread: 0.2,         // Percentage above and below market prices for sell and buy orders 
    tickInterval: 2000  // Duration between each tick, in milliseconds
  };
  const blockbidClient = new ccxt.blockbid({
    apiKey: API_KEY,
    secret: SECRET
  });
  tick(config, blockbidClient );
  setInterval(tick, config.tickInterval, config, blockbidClient);
};

run();
