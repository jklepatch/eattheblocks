require('dotenv').config();
const Web3 = require('web3');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');


const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WSS_URL)
);
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const amountInBUSD = web3.utils.toBN(web3.utils.toWei('100'));
const amountInWBNB = web3.utils.toBN(web3.utils.toWei('1'));


const ApeSwap = new web3.eth.Contract(
  abis.apeSwap.router,
  addresses.apeSwap.router
);

const PancakeSwap = new web3.eth.Contract(
  abis.pancakeSwap.router,
  addresses.pancakeSwap.router
);

const init = async () => {
  const networkId = await web3.eth.net.getId();
  


  web3.eth.subscribe('newBlockHeaders')
  .on('data', async block => {
    console.log(`New block received. Block # ${block.number}`);

     
    const amountsOut1 = await ApeSwap.methods.getAmountsOut(amountInBUSD,[addresses.tokens.BUSD, addresses.tokens.WBNB] ).call();
    const amountsOut2 = await ApeSwap.methods.getAmountsOut(amountInWBNB, [addresses.tokens.WBNB, addresses.tokens.BUSD]).call();
   
    

    const amountsOut3 = await PancakeSwap.methods.getAmountsOut(amountInBUSD, [addresses.tokens.BUSD, addresses.tokens.WBNB]).call();
    const amountsOut4 = await PancakeSwap.methods.getAmountsOut(amountInWBNB, [addresses.tokens.WBNB, addresses.tokens.BUSD]).call();    
    

   
    const aperesults = {
      buy: (amountInBUSD / amountsOut1[1]),
      sell: (amountsOut2[1] / amountInWBNB)
    }

    const pancakeresults = {
      buy: (amountInBUSD / amountsOut3[1]),
      sell: (amountsOut4[1] / amountInWBNB )
    }
    
    
    
    console.log('ApeSwap BUSD/WBNB');
    console.log(aperesults);
    
    console.log('PancakeSwap BUSD/WBNB')
    console.log(pancakeresults)
    



    const gasPrice = await web3.eth.getGasPrice();
      //200000 is picked arbitrarily
      const txCost = 200000 * parseInt(gasPrice);
      const currentBNBPrice = (pancakeresults.buy + pancakeresults.sell) / 2; 
      const profit1 = (amountInWBNB * (aperesults.sell - pancakeresults.buy) - (txCost / 10 ** 18) * currentBNBPrice );
      const profit2 = (amountInWBNB * (pancakeresults.sell - aperesults.buy) - (txCost / 10 ** 18) * currentBNBPrice );
     

      
      if(profit1 > 0) {
        console.log('Arb opportunity found!');
        console.log(`Flashloan WBNB on Apeswap at ${aperesults.buy} `);
        console.log(`Sell WBNB on PancakeSwap at ${pancakeresults.sell} `);
        console.log(`Expected profit: ${profit1} BUSD`);
        //Execute arb Kyber <=> Uniswap
      }  
      if(profit2 > 0) {
        console.log('Arb opportunity found!');
        console.log(`Buy WBNB from PancakeSwap at ${pancakeresults.buy} `);
        console.log(`Sell WBNB from ApeSwap at ${aperesults.sell}`);
        console.log(`Expected profit: ${profit2} BUSD`);
        //Execute arb Uniswap <=> Kyber
      }
  })
  .on('error', error => {
    console.log(error);
  });
}
init();