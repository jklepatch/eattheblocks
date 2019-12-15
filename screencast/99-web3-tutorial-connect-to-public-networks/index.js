const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const address = '0x02A1B1458cF6c53DcF2632BBCDD421FF6A193953';
const privateKey = "0xc3a0412c1103c14232c543239fa0e135efc82bebd71a7d49c8eabb27d3568299";

const init = async () => {
  const provider = new HDWalletProvider(
    privateKey,
    'https://ropsten.infura.io/v3/0ee3457444d1462ca9e5bbee50ba06e6',
  );
  const web3 = new Web3(provider);
  
  let contract = new web3.eth.Contract(
    MyContract.abi,
  );

  contract = await contract
    .deploy({data: MyContract.bytecode})
    .send({from: address});

  await contract.methods
    .setData(10)
    .send({from: address});

  const result = await contract.methods
    .getData()
    .call();

  console.log(result);
}

init();
