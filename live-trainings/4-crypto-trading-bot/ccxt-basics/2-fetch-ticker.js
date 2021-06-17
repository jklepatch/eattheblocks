const ccxt = require ('ccxt');

(async function(){
    // no need for API key
    // 0. can switch between multiple exchanges
    const exchange = new ccxt.binance();
    // or
    // const exchange = new ccxt.coinbasepro();
    // 1. fetch ticker from binance
    // const ticker = await exchange.fetchTicker("ETH/USD"); // ETH/USD for coinbase 
    // console.log(ticker);
    
    // 2. ohlcv
    const ohlc = await exchange.fetchOHLCV("ETH/USDT","15m",undefined,5);

    ohlc.forEach(candle => {
        console.log(candle)
    });
})();
