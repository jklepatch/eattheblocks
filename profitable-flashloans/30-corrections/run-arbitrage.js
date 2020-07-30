require("dotenv").config()
const Web3 = require('web3');
const { ChainId, Token, TokenAmount, Pair } = require('@uniswap/sdk');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
const Flashloan = require('./build/contracts/Flashloan.json');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const kyber = new web3.eth.Contract(
  abis.kyber.kyberNetworkProxy,
  addresses.kyber.kyberNetworkProxy
);

const ONE_WEI = web3.utils.toBN(web3.utils.toWei('1'));
const AMOUNT_DAI_WEI = web3.utils.toBN(web3.utils.toWei('20000'));
const DIRECTION = {
  KYBER_TO_UNISWAP: 0,
  UNISWAP_TO_KYBER: 1
};

const init = async () => {
  const networkId = await web3.eth.net.getId();
  const flashloan = new web3.eth.Contract(
    Flashloan.abi,
    Flashloan.networks[networkId].address
  );
  
  let ethPrice;
  const updateEthPrice = async () => {
    const results = await kyber
      .methods
      .getExpectedRate(
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
        addresses.tokens.dai, 
        1
      )
      .call();
    ethPrice = web3.utils.toBN('1').mul(web3.utils.toBN(results.expectedRate)).div(ONE_WEI);
  }
  await updateEthPrice();
  setInterval(updateEthPrice, 15000);

  web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
      console.log(`New block received. Block # ${block.number}`);

      const [dai, weth] = await Promise.all(
        [addresses.tokens.dai, addresses.tokens.weth].map(tokenAddress => (
          Token.fetchData(
            ChainId.MAINNET,
            tokenAddress,
          )
      )));
      const daiWeth = await Pair.fetchData(
        dai,
        weth,
      );

      const amountsEth = await Promise.all([
        kyber
          .methods
          .getExpectedRate(
            addresses.tokens.dai, 
            '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
            AMOUNT_DAI_WEI
          ) 
          .call(),
        daiWeth.getOutputAmount(new TokenAmount(dai, AMOUNT_DAI_WEI)),
      ]);
      const ethFromKyber = AMOUNT_DAI_WEI.mul(web3.utils.toBN(amountsEth[0].expectedRate)).div(ONE_WEI);
      const ethFromUniswap = web3.utils.toBN(amountsEth[1][0].raw.toString());

      const amountsDai = await Promise.all([
        kyber
          .methods
          .getExpectedRate(
            '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
            addresses.tokens.dai, 
            ethFromUniswap.toString()
          ) 
          .call(),
        daiWeth.getOutputAmount(new TokenAmount(weth, ethFromKyber.toString())),
      ]);
      const daiFromKyber = ethFromUniswap.mul(web3.utils.toBN(amountsDai[0].expectedRate)).div(ONE_WEI);
      const daiFromUniswap = web3.utils.toBN(amountsDai[1][0].raw.toString());

      console.log(`Kyber -> Uniswap. Dai input / output: ${web3.utils.fromWei(AMOUNT_DAI_WEI.toString())} / ${web3.utils.fromWei(daiFromUniswap.toString())}`);
      console.log(`Uniswap -> Kyber. Dai input / output: ${web3.utils.fromWei(AMOUNT_DAI_WEI.toString())} / ${web3.utils.fromWei(daiFromKyber.toString())}`);

      if(daiFromUniswap.gt(AMOUNT_DAI_WEI)) {
        const tx = flashloan.methods.initiateFlashloan(
          addresses.dydx.solo, 
          addresses.tokens.dai, 
          AMOUNT_DAI_WEI,
          DIRECTION.KYBER_TO_UNISWAP
        );
        const [gasPrice, gasCost] = await Promise.all([
          web3.eth.getGasPrice(),
          tx.estimateGas({from: admin}),
        ]);

        const txCost = web3.utils.toBN(gasCost).mul(web3.utils.toBN(gasPrice)).mul(ethPrice);
        const profit = daiFromUniswap.sub(AMOUNT_DAI_WEI).sub(txCost);

        if(profit > 0) {
          console.log('Arb opportunity found Kyber -> Uniswap!');
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

      if(daiFromKyber.gt(AMOUNT_DAI_WEI)) {
        const tx = flashloan.methods.initiateFlashloan(
          addresses.dydx.solo, 
          addresses.tokens.dai, 
          AMOUNT_DAI_WEI,
          DIRECTION.UNISWAP_TO_KYBER
        );
        const [gasPrice, gasCost] = await Promise.all([
          web3.eth.getGasPrice(),
          tx.estimateGas({from: admin}),
        ]);
        const txCost = web3.utils.toBN(gasCost).mul(web3.utils.toBN(gasPrice)).mul(ethPrice);
        const profit = daiFromKyber.sub(AMOUNT_DAI_WEI).sub(txCost);

        if(profit > 0) {
          console.log('Arb opportunity found Uniswap -> Kyber!');
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
