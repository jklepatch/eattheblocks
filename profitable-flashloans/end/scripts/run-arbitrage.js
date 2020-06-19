require("dotenv").config()
const Web3 = require('web3');
const Flashloan = require('../build/contracts/Flashloan.json');
const BlockchainClient = require('../BlockchainClient.js');
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const client = new BlockchainClient(web3);



const flashLoan = web3.eth.Contract(
  Flashloan,
  Flashloan
);

web3.eth.subscribe('newBlockHeaders')
  .on('data', async d => {
    console.log(`New block received. Block # ${d.number}`)
    const kyberPrice = kyber.getExpectedPrice();
    const uniswapPrice
    const maxPrice
    if(kyberPrice - uniswaPrice.
      flashLoan(
    //1. Check price Kyver
    //2. Check price Uniswap
    //3. If discrepancy run arb
  })
  .on('error', error => {
    console.log(error);
  });
