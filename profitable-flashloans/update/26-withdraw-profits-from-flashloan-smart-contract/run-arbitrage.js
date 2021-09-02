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

    const Pancakeresults = {
      buy: (amountInBUSD / amountsOut3[1]),
      sell: (amountsOut4[1] / amountInWBNB )
    }
    
    
    
    



    const gasPrice = await web3.eth.getGasPrice();
      //200000 is picked arbitrarily
      const txCost = 200000 * parseInt(gasPrice);
      const currentBNBPrice = (Pancakeresults.buy + Pancakeresults.sell) / 2; 
      const profit1 = (amountInWBNB * (aperesults.sell - Pancakeresults.buy) - (txCost / 10 ** 18) * currentBNBPrice );
      const profit2 = (amountInWBNB * (Pancakeresults.sell - aperesults.buy) - (txCost / 10 ** 18) * currentBNBPrice );
       

      
      if(profit1 > 0 && profit1 > profit2) {
        console.log('Arb opportunity found!');
        console.log(`Flashloan WBNB on Apeswap at ${aperesults.buy} `);
        console.log(`Sell WBNB on PancakeSwap at ${Pancakeresults.sell} `);
        console.log(`Expected profit: ${profit1} BUSD`);
    
        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.WBNB,   //token1
          addresses.tokens.BUSD,   //token2  
          amountInWBNB,          //amount0
          0,      //amount1
          0,        //direction
          0       //slippage
          );
        const data = tx.encodeABI();
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: gas,
          gasPrice: gasPrice
         };
       const receipt = await web3.eth.sendTransaction(txData);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
      }  
      if(profit2 > 0 && profit2 > profit1) {
        console.log('Arb opportunity found!');
        console.log(`Buy WBNB from PancakeSwap at ${Pancakeresults.buy} `);
        console.log(`Sell WBNB from ApeSwap at ${aperesults.sell}`);
        console.log(`Expected profit: ${profit2} BUSD`);
        
        
        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.WBNB,   //token1
          addresses.tokens.BUSD,   //token2  
          amountInWBNB,          //amount0
          0,      //amount1
          1,        //direction
          0         //slippage
          );
        const data = tx.encodeABI();
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: gas,
          gasPrice: gasPrice
         };
       const receipt = await web3.eth.sendTransaction(txData);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
      }
  })
  .on('error', error => {
    console.log(error);
  });
}
init();