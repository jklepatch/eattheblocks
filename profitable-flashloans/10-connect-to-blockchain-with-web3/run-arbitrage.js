require("dotenv").config()
const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);
