'use strict';
require("dotenv").config();
const ccxt = require ('ccxt');
const fs = require('fs');

(async function () {
    // 1. print-all-exchanges
    // fs.writeFileSync("ccxt-exchanges.json", JSON.stringify(ccxt.exchanges))
    // const exchangeId = 'binance'
    //     , exchangeClass = ccxt[exchangeId]
    //     , exchange = new exchangeClass ({
    //         'apiKey': process.env.BINANCE_API_KEY,
    //         'secret': process.env.BINANCE_SECRET_KEY,
    //     })
    // 2. load-market-data
    // fs.writeFileSync("binance-market-data.json", JSON.stringify(await exchange.loadMarkets()))
    // const markets = require("./binance-market-data.json");
    // const marketsArr = Object.keys(markets).map(market=>market)
    // fs.writeFileSync("binance-markets.json", JSON.stringify(marketsArr))

        const exchangeIdUS = 'binanceus'
        , exchangeClassUS = ccxt[exchangeIdUS]
        , exchangeUS = new exchangeClassUS ({
            'apiKey': process.env.BINANCE_US_API_KEY,
            'secret': process.env.BINANCE_US_SECRET_KEY,
        })
        console.log("Binance US",await exchangeUS.fetchBalance())
})();