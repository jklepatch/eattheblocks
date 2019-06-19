const HttpProvider = require('ethjs-provider-http');
const BlockTracker = require('eth-block-tracker');

const provider = new HttpProvider('https://mainnet.infura.io');
const blockTracker = new BlockTracker({provider});
const blocks = [];

//blockTracker.on('latest', blockNumber => console.log(Number(blockNumber)));

blockTracker.on('sync', ({newBlock, oldBlock}) => {
  const _newBlock = Number(newBlock);
  const _oldBlock = typeof oldBlock === 'undefined' ? undefined :  Number(oldBlock);
  if(_oldBlock) {
    let i = 1;
    while(i <= _newBlock - _oldBlock) {
      blocks.push(_oldBlock + i);
      i++;
    }
    console.log(`Sync #${_oldBlock} -> #${_newBlock}`);
  } else {
    blocks.push(_newBlock);
    console.log(`First sync #${_newBlock}`);
  }
});

process.on('SIGINT', () => {
  console.log(blocks);
  process.exit();
});
