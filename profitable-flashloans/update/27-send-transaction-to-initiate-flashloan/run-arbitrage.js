require('dotenv').config();
const Web3 = require('web3');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');


const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WSS_URL)
);
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const amountInDai = web3.utils.toBN(web3.utils.toWei('1'));

const Flashloan = require('./build/contracts/Flashloan.json');

const DIRECTION = {
  BAKERY_TO_PANCAKE: 0,
  PANCAKE_TO_BAKERY: 1
};
const PancakeSwap = new web3.eth.Contract(
  abis.pancakeSwap.router,
  addresses.pancakeSwap.router
);

const BakerySwap = new web3.eth.Contract(
  abis.bakerySwap.router,
  addresses.bakerySwap.router
);

const repayAmount = (amountInDai -  (amountInDai * .997)) + amountInDai

const init = async () => {
  const networkId = await web3.eth.net.getId();

  const flashloan = new web3.eth.Contract(
    Flashloan.abi,
   Flashloan.networks[networkId].address
  );

  web3.eth.subscribe('newBlockHeaders')
  .on('data', async block => {
    console.log(`New block received. Block # ${block.number}`);

    const amountsOut1 = await PancakeSwap.methods.getAmountsOut(amountInDai,[addresses.tokens.DAI, addresses.tokens.WBNB] ).call();
    const amountsOut2 = await BakerySwap.methods.getAmountsOut(amountsOut1[1], [addresses.tokens.WBNB, addresses.tokens.DAI]).call();
    const amountsOut3 = await BakerySwap.methods.getAmountsOut(amountInDai, [addresses.tokens.DAI, addresses.tokens.WBNB]).call();    // dai to Wbnb bakeryswap
    const amountsOut4 = await PancakeSwap.methods.getAmountsOut(amountsOut3[1], [addresses.tokens.WBNB, addresses.tokens.DAI]).call();   // Wbnb to dai pancakeswap

    console.log(`PancakeSwap -> BakerySwap. Dai input / output: ${web3.utils.fromWei(amountInDai.toString())} / ${web3.utils.fromWei(amountsOut2[1].toString())}`);
    console.log(`BakerySwap -> PancakeSwap. Dai input / output: ${web3.utils.fromWei(amountInDai.toString())} / ${web3.utils.fromWei(amountsOut4[1].toString())}`);
    
    const BTP = web3.utils.toBN(amountsOut2[1])
    const PTB = web3.utils.toBN(amountsOut4[1])

if (BTP.gt(amountInDai)) {
  const gasPrice = await web3.eth.getGasPrice();
      //200000 is picked arbitrarily, have to be replaced by actual tx cost in next lectures, with Web3 estimateGas()
  const txCost = 200000 * parseInt(gasPrice);
  const profit = amountsOut2[1].sub(amountInDai).sub(txCost);

  if(profit > 0) {
    console.log('Arb opportunity found Kyber -> Uniswap!');
    console.log(`Expected profit: ${web3.utils.fromWei(profit.toString)} Dai`);
    
    let tx = flashloan.methods.startArbitrage(
      addresses.tokens.DAI,
      addresses.tokens.WBNB,
      amountInDai,
      0,
      DIRECTION.BAKERY_TO_PANCAKE,
      repayAmount.toString()
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
}

if(PTB.gt(amountInDai)) {
  const gasPrice = await web3.eth.getGasPrice();
      //200000 is picked arbitrarily, have to be replaced by actual tx cost in next lectures, with Web3 estimateGas()
  const txCost = 200000 * parseInt(gasPrice);
  const profit = amountsOut4[1].sub(amountInDai).sub(txCost);

  if(profit > 0) {
    console.log('Arb opportunity found Uniswap -> Kyber!');
    console.log(`Expected profit: ${web3.utils.fromWei(profit.toString())} Dai`);
    
    let tx = flashloan.methods.startArbitrage(
      addresses.tokens.DAI,
      addresses.tokens.WBNB,
      amountInDai,
      0,
      DIRECTION.PANCAKE_TO_BAKERY,
      repayAmount.toString()
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

} 


  })
  .on('error', error => {
    console.log(error);
  });

  
}
init();

