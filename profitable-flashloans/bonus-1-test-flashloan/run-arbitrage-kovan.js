require("dotenv").config()
const Web3 = require('web3');
const abis = require('./abis');
const { kovan: addresses } = require('./addresses');
const Arbitrage = require('./build/contracts/TestArbitrage.json');

const web3 = new Web3(process.env.INFURA_URL_KOVAN);
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const kyber = new web3.eth.Contract(
  abis.kyber.kyberNetworkProxy,
  addresses.kyber.kyberNetworkProxy
);

const init = async () => {
  const networkId = await web3.eth.net.getId();
  const arbitrage = new web3.eth.Contract(
    Arbitrage.abi,
    Arbitrage.networks[networkId].address
  );

  const dai = new web3.eth.Contract(
    abis.tokens.erc20,
    addresses.tokens.dai
  );

  console.log(await dai.methods.balanceOf(arbitrage.options.address).call());
  console.log(await dai.methods.balanceOf(admin).call());
  console.log(await web3.eth.getBalance(admin));
  await dai.methods.approve(arbitrage.options.address, 1000).send({
    from: admin,
    gas: 500000,
    gasPrice: 20e9 
  }); 
  console.log(await dai.methods.balanceOf(arbitrage.options.address).call());
  await arbitrage.methods.kyberToUniswap(1000).send({
    from: admin,
    gas: 1000000,
    gasPrice: 20e9 
  });
  console.log(await dai.methods.balanceOf(arbitrage.options.address).call());
  console.log(await web3.eth.getBalance(arbitrage.options.address));
}
init();
