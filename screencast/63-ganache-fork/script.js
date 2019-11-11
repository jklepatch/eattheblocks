const Web3 = require('web3');
const daiAbi = require('./abi.js');

const recipientAddress = "0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E";
const unlockedAddress = "0xF39d30Fa570db7940e5b3A3e42694665A1449E4B";
const daiAddress = "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359"; 

const web3 = new Web3('http://localhost:8545'); 
const dai = new web3.eth.Contract(
  daiAbi,
  daiAddress
);

async function run() {
  let unlockedBalance, recipientBalance;

  ([unlockedBalance, recipientBalance] = await Promise.all([
    dai.methods
      .balanceOf(unlockedAddress)
      .call(),
    dai.methods
      .balanceOf(recipientAddress)
      .call()
  ]));
  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);

  await dai.methods
    .transfer(recipientAddress, 1000)
    .send({from: unlockedAddress});

  ([unlockedBalance, recipientBalance] = await Promise.all([
    dai.methods
      .balanceOf(unlockedAddress)
      .call(),
    dai.methods
      .balanceOf(recipientAddress)
      .call()
  ]));
  console.log(`Balance unlocked: ${unlockedBalance}`);
  console.log(`Balance recipient: ${recipientBalance}`);
}

run();
