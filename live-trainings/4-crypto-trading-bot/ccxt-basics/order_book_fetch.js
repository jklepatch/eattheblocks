const ccxt = require ('ccxt');

(async function(){
    const exchange = new ccxt.binanceus();
    const orderBook = await exchange.fetchOrderBook("ETH/USD");
    console.log(orderBook)
})();
