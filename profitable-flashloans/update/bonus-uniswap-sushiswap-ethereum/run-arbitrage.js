require("dotenv").config()
const Web3 = require('web3');

const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
const Flashloan = require('./build/contracts/Flashloan.json');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const uniswap = new web3.eth.Contract(
  abis.uniswap.uniswap,
  addresses.uniswap.router
)

const sushi = new web3.eth.Contract(
  abis.sushi.sushi,
  addresses.sushi.router
)

const ONE_WEI = web3.utils.toBN(web3.utils.toWei('1'));
const AMOUNT_DAI_WEI = web3.utils.toBN(web3.utils.toWei('20000'));
const DIRECTION = {
  SUSHI_TO_UNISWAP: 0,
  UNISWAP_TO_SUSHI: 1
};

const init = async () => {
  const networkId = await web3.eth.net.getId();
  const flashloan = new web3.eth.Contract(
    Flashloan.abi,
    Flashloan.networks[networkId].address
  );
  
  let ethPrice;
  const updateEthPrice = async () => {
    const results = await uniswap.methods.getAmountsOut(web3.utils.toWei('1'), [addresses.tokens.weth, addresses.tokens.dai]).call();   //dai to wbnb pancakeswap
    ethPrice = web3.utils.toBN('1').mul(web3.utils.toBN(results[1])).div(ONE_WEI);
  }
  await updateEthPrice();
  setInterval(updateEthPrice, 15000);

  web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
      console.log(`New block received. Block # ${block.number}`);

      
      const amountsOut1 = await sushi.methods.getAmountsOut(AMOUNT_DAI_WEI, [addresses.tokens.dai, addresses.tokens.weth]).call();   //dai to wbnb pancakeswap
      const amountsOut2 = await uniswap.methods.getAmountsOut(amountsOut1[1], [addresses.tokens.weth, addresses.tokens.dai]).call();    //wbnb to dai bakeryswap
      const amountsOut3 = await uniswap.methods.getAmountsOut(AMOUNT_DAI_WEI, [addresses.tokens.dai, addresses.tokens.weth]).call();    // dai to Wbnb baketswap
      const amountsOut4 = await sushi.methods.getAmountsOut(amountsOut3[1], [addresses.tokens.weth, addresses.tokens.dai]).call();   // Wbnb to dai pancakeswap

      
      
      console.log(`Sushi -> Uniswap. Dai input / output: ${web3.utils.fromWei(AMOUNT_DAI_WEI.toString())} / ${web3.utils.fromWei(amountsOut2[1].toString())}`);
      console.log(`Uniswap -> Sushi. Dai input / output: ${web3.utils.fromWei(AMOUNT_DAI_WEI.toString())} / ${web3.utils.fromWei(amountsOut4[1].toString())}`);

      const daiFromUniswap = web3.utils.toBN(amountsOut2[1])
      const daiFromSushi = web3.utils.toBN(amountsOut2[1])


      if(daiFromUniswap.gt(AMOUNT_DAI_WEI)) {
        const tx = flashloan.methods.initiateFlashloan(
          addresses.dydx.solo, 
          addresses.tokens.dai, 
          AMOUNT_DAI_WEI,
          DIRECTION.SUSHI_TO_UNISWAP
        );
        const [gasPrice, gasCost] = await Promise.all([
          web3.eth.getGasPrice(),
          tx.estimateGas({from: admin}),
        ]);

        const txCost = web3.utils.toBN(gasCost).mul(web3.utils.toBN(gasPrice)).mul(ethPrice);
        const profit = daiFromUniswap.sub(AMOUNT_DAI_WEI).sub(txCost);

        if(profit > 0) {
          console.log('Arb opportunity found Sushi -> Uniswap!');
          console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
          const data = tx.encodeABI();
          const txData = {
            from: admin,
            to: flashloan.options.address,
            data,
            gas: gasCost,
            gasPrice
          };
          const receipt = await web3.eth.sendTransaction(txData);
          console.log(`Transaction hash: ${receipt.transactionHash}`);
        }
      }

      if(daiFromSushi.gt(AMOUNT_DAI_WEI)) {
        const tx = flashloan.methods.initiateFlashloan(
          addresses.dydx.solo, 
          addresses.tokens.dai, 
          AMOUNT_DAI_WEI,
          DIRECTION.UNISWAP_TO_SUSHI
        );
        const [gasPrice, gasCost] = await Promise.all([
          web3.eth.getGasPrice(),
          tx.estimateGas({from: admin}),
        ]);
        const txCost = web3.utils.toBN(gasCost).mul(web3.utils.toBN(gasPrice)).mul(ethPrice);
        const profit = daiFromKyber.sub(AMOUNT_DAI_WEI).sub(txCost);

        if(profit > 0) {
          console.log('Arb opportunity found Uniswap -> Sushi!');
          console.log(`Expected profit: ${web3.utils.fromWei(profit)} Dai`);
          const data = tx.encodeABI();
          const txData = {
            from: admin,
            to: flashloan.options.address,
            data,
            gas: gasCost,
            gasPrice
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
