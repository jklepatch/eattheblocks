'use strict';
require("dotenv").config();
const ccxt = require ('ccxt');

(async function () {
    const exchange = new ccxt.binance ({
            'apiKey': process.env.BINANCE_API_KEY,
            'secret': process.env.BINANCE_SECRET_KEY,
            timeout:30000,
            enableRateLimit:true
        })
    // exchange.setSandboxMode (true) // enable sandbox mode
    const balances = await exchange.fetchBalance()
    console.log(balances.info.balances)
})();