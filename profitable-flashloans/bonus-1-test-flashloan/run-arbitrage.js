require("dotenv").config()
const Web3 = require('web3');
const { ChainId, Token, TokenAmount, Pair } = require('@uniswap/sdk');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
const Flashloan = require('./build/contracts/Flashloan.json');
const VaultManager = require('./build/contracts/VaultManager.json');
const DaiFaucet = require('./build/contracts/DaiFaucet.json');

const web3 = new Web3('http://127.0.0.1:8545');
const admin = '0xC4D54e2C776beA8c182707b06aCE8015856abc09';

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
  const vaultManager = new web3.eth.Contract(
    VaultManager.abi,
    VaultManager.networks[networkId].address
  );

  const dai = new web3.eth.Contract(
    abis.tokens.erc20,
    addresses.tokens.dai
  );

  const DAI_FROM_MAKER = web3.utils.toWei('30000')

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

  const [tx1, tx2] = Object.keys(DIRECTION).map(direction => flashloan.methods.initiateFlashloan(
    addresses.dydx.solo, 
    addresses.tokens.dai, 
    AMOUNT_DAI_WEI,
    DIRECTION[direction]
  ));
  let [gasPrice, gasCost1, gasCost2] = await Promise.all([
    web3.eth.getGasPrice(),
    600000,
    600000,
    //tx1.estimateGas({from: admin}),
    //tx2.estimateGas({from: admin})
  ]);
  const txCost1 = parseInt(gasCost1) * parseInt(gasPrice);
  const txCost2 = parseInt(gasCost2) * parseInt(gasPrice);
    
  const gasCost = 1000000; //240247
  console.log('initiating flashloan Kyber => Uniswap');
  const r = await tx2.send({
    from: admin, 
    gas: gasCost, 
    gasPrice
  });
}
init();
