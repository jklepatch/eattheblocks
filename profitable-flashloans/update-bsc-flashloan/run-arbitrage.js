require("dotenv").config()
const Web3 = require('web3');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
//const Flashloan = require('./build/contracts/Flashloan.json');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('https://bsc-dataseed.binance.org/')
);
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

//const ONE_WEI = web3.utils.toBN(web3.utils.toWei('1'));
//const AMOUNT_DAI_WEI = web3.utils.toBN(web3.utils.toWei('20000'));
//const DIRECTION = {
//  KYBER_TO_UNISWAP: 0,
//  UNISWAP_TO_KYBER: 1
//};

const amountInDai = web3.utils.toBN(web3.utils.toWei('20000'));

const init = async () => {
  const networkId = await web3.eth.net.getId();
  //const flashloan = new web3.eth.Contract(
  //  Flashloan.abi,
  //  Flashloan.networks[networkId].address
  //);
  const pancakeSwap = new web3.eth.Contract(
    abis.pancakeSwap.router,
    addresses.pancakeSwap.router
  );
  const bakerySwap = new web3.eth.Contract(
    abis.bakerySwap.router,
    addresses.bakerySwap.router
  );
  
  //let ethPrice;
  //const updateEthPrice = async () => {
  //  const results = await kyber
  //    .methods
  //    .getExpectedRate(
  //      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
  //      addresses.tokens.dai, 
  //      1
  //    )
  //    .call();
  //  ethPrice = web3.utils.toBN('1').mul(web3.utils.toBN(results.expectedRate)).div(ONE_WEI);
  //}
  //await updateEthPrice();
  //setInterval(updateEthPrice, 15000);

  web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
      console.log(`New block received. Block # ${block.number}`);

      const amountsOut1 = await pancakeSwap.getAmountsOut(amountInDai, [addresses.DAI, addresses.WETH]);
      const amountsOut2 = await bakerySwap.getAmountsOut(amountsOut1[1], [addresses.WETH, addresses.DAI]);
      const amountsOut3 = await bakerySwap.getAmountsOut(amountInDai, [addresses.DAI, addresses.WETH]);
      const amountsOut4 = await pancakeSwap.getAmountsOut(amountsOut3[1], [addresses.WETH, addresses.DAI]);

      console.log(`PancakeSwap -> BakerySwap. Dai input / output: ${web3.utils.fromWei(amountInDai.toString())} / ${web3.utils.fromWei(amountsOut2[1].toString())}`);
      console.log(`BakerySwap -> PancakeSwap. Dai input / output: ${web3.utils.fromWei(amountInDai.toString())} / ${web3.utils.fromWei(amountsOut4[1].toString())}`);

      if(amountsOut2[1].gt(amountDaiIn)) {
      //  const tx = flashloan.methods.initiateFlashloan(
      //    addresses.dydx.solo, 
      //    addresses.tokens.dai, 
      //    amountInDai
      //    DIRECTION.PANCAKESWAP_TO_BAKERYSWAP
      //  );
      //  const [gasPrice, gasCost] = await Promise.all([
      //    web3.eth.getGasPrice(),
      //    tx.estimateGas({from: admin}),
      //  ]);

      //  const txCost = web3.utils.toBN(gasCost).mul(web3.utils.toBN(gasPrice)).mul(ethPrice);
      //  const profit = amountsOut2[1].sub(amountInDai).sub(txCost);

      //  if(profit > 0) {
      //    console.log('Arb opportunity found PancakeSwap -> BakerySwap!');
      //    console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
      //    const data = tx.encodeABI();
      //    const txData = {
      //      from: admin,
      //      to: flashloan.options.address,
      //      data,
      //      gas: gasCost,
      //      gasPrice
      //    };
      //    const receipt = await web3.eth.sendTransaction(txData);
      //    console.log(`Transaction hash: ${receipt.transactionHash}`);
      //  }
      }

      if(amountsOut4[1].gt(amountInDai)) {
      //  const tx = flashloan.methods.initiateFlashloan(
      //    addresses.dydx.solo, 
      //    addresses.tokens.dai, 
      //    amountInDai,
      //    DIRECTION.BAKERYSWAP_TO_PANCAKESWAP
      //  );
      //  const [gasPrice, gasCost] = await Promise.all([
      //    web3.eth.getGasPrice(),
      //    tx.estimateGas({from: admin}),
      //  ]);
      //  const txCost = web3.utils.toBN(gasCost).mul(web3.utils.toBN(gasPrice)).mul(ethPrice);
      //  const profit = daiFromKyber.sub(amountInDai).sub(txCost);

      //  if(profit > 0) {
      //    console.log('Arb opportunity found BakerySwap -> PancakeSwap!');
      //    console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
      //    const data = tx.encodeABI();
      //    const txData = {
      //      from: admin,
      //      to: flashloan.options.address,
      //      data,
      //      gas: gasCost,
      //      gasPrice
      //    };
      //    const receipt = await web3.eth.sendTransaction(txData);
      //    console.log(`Transaction hash: ${receipt.transactionHash}`);
      //  }
      }
    })
    .on('error', error => {
      console.log(error);
    });
}
init();
