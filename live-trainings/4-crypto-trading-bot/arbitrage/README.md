## Arbitrage bot
Display a message on console if arbitrage is possible among the specified exchanges

### Installation

- `npm install`
- `npm install -g pm2`

### Run the script using node
- `node ./arbitrage-pair.js binance gemini kraken`

### Run the script every 2 minutes in the background
- `pm2 start index.js --cron "*/2 * * * *" --no-autorestart --log "arbitrage-binanceus-coinbasepro"   --name "arbitrage-bot" -- binanceus coinbasepro`