'use strict';
require("dotenv").config();
const ccxt = require ('ccxt');
const kraken = require("./kraken.json");

// const exchange = new ccxt.kraken();
// const markets = await exchange.loadMarkets();

Object.keys(kraken).forEach((market,index) => {
    console.log(`${index + 1} -> ${market}`)
});