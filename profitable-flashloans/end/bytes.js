const Web3 = require('web3');
const web3 = new Web3('http://localhost:9545');
const addressFrom = Buffer.from('55e5Ceb9D13b4e198735EED64235eE6EDF8e4508'); 
const addressTo = Buffer.from('0xCDfF453fc3ed32F734672a914FFcFd19636AA4A0');
const buffer = Buffer.concat([addressFrom, addressTo]);



console.log(
  web3.eth.abi.encodeParameter('bytes', `0x${buffer.toString('hex')}`)
);
//console.log(buffer.toString('hex'));
