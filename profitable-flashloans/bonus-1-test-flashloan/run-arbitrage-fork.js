require("dotenv").config()
const Web3 = require('web3');
const { ChainId, Token, TokenAmount, Pair } = require('@uniswap/sdk');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
const Flashloan = require('./build/contracts/Flashloan.json');
const Arbitrage = require('./build/contracts/TestArbitrage.json');
const DaiFaucet = require('./build/contracts/DaiFaucet.json');
const VaultManager = require('./build/contracts/VaultManager.json');

const web3 = new Web3('http://127.0.0.1:8545');
const admin = 'REPLACE BY YOUR ADDRESS HERE';

const kyber = new web3.eth.Contract(
  abis.kyber.kyberNetworkProxy,
  addresses.kyber.kyberNetworkProxy
);

const AMOUNT_ETH = 100;
const RECENT_ETH_PRICE = 230;
const AMOUNT_ETH_WEI = web3.utils.toWei(AMOUNT_ETH.toString());
const AMOUNT_DAI_WEI = web3.utils.toWei((AMOUNT_ETH * RECENT_ETH_PRICE).toString());
const DIRECTION = {
  KYBER_TO_UNISWAP: 0,
  UNISWAP_TO_KYBER: 1
};

const init = async () => {
  const networkId = await web3.eth.net.getId();
  const daiFaucetAddress = DaiFaucet.networks[networkId].address

  const flashloan = new web3.eth.Contract(
    Flashloan.abi,
    Flashloan.networks[networkId].address
  );
  const arbitrage = new web3.eth.Contract(
    Arbitrage.abi,
    Arbitrage.networks[networkId].address
  );
  const dai = new web3.eth.Contract(
    abis.tokens.erc20,
    addresses.tokens.dai
  );
  const vaultManager = new web3.eth.Contract(
    VaultManager.abi,
    VaultManager.networks[networkId].address
  );

  const DAI_FROM_MAKER = web3.utils.toWei('30000');

  console.log(`Borrowing ${web3.utils.fromWei(DAI_FROM_MAKER)} DAI from Maker`);
  await vaultManager
    .methods
    .openVault(
      addresses.makerdao.CDP_MANAGER,
      addresses.makerdao.MCD_JUG,
      addresses.makerdao.MCD_JOIN_ETH_A,
      addresses.makerdao.MCD_JOIN_DAI,
      DAI_FROM_MAKER,
    )
    .send({
      from: admin,
      gas: 1000000,
      gasPrice: 1,
      value: web3.utils.toWei('60000')
    });

  //await new Promise(resolve => setTimeout(resolve, 30000));
  console.log(`Transfering ${web3.utils.fromWei(DAI_FROM_MAKER)} DAI to DaiFaucet`);
  await dai
    .methods
    .transfer(
      daiFaucetAddress,
      DAI_FROM_MAKER
    )
    .send({
      from: admin,
      gas: 200000,
      gasPrice: 1
    });
  const daiFaucetBalance = await dai
    .methods
    .balanceOf(daiFaucetAddress)
    .call();
  console.log(`DAI balance of DaiFaucet: ${web3.utils.fromWei(daiFaucetBalance)}`);

  const tx1 = flashloan.methods.initiateFlashloan(
    addresses.dydx.solo,
    addresses.tokens.dai,
    AMOUNT_DAI_WEI,
    DIRECTION.KYBER_TO_UNISWAP
  );

  //console.log('estimating gas');
  //let [gasPrice, gasCost1, gasCost2] = await Promise.all([
  //  web3.eth.getGasPrice(),
  //  tx1.estimateGas({from: admin}),
  //  tx2.estimateGas({from: admin})
  //]);
  
  console.log('initiating arbitrage Kyber => Uniswap');
  const r = await tx1.send({
    from: admin, 
    gas: 1000000, 
    gasPrice: 1
  });
}
init();
