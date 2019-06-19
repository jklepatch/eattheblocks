const HttpProvider = require('ethjs-provider-http');
const BlockTracker = require('eth-block-tracker');
const Observable = require('rxjs').Observable;
const concatMap = require('rxjs/operators').concatMap;
const tap = require('rxjs/operators').tap;

const provider = new HttpProvider('https://mainnet.infura.io');
const blockTracker = new BlockTracker({ provider });

const observable = new Observable(subscribe => { 
  blockTracker.on('sync', ({ newBlock, oldBlock }) => {
    const _newBlock = Number(newBlock);
    const _oldBlock = typeof oldBlock !== 'undefined' ? Number(oldBlock) : undefined;
    if (oldBlock) {
      let i = 1;
      while(i <= _newBlock - _oldBlock) {
        subscribe.next(_oldBlock + i);
        i++;
      }
    } else {
      subscribe.next(_newBlock);
    }
  });
});

//const subscribe = observable.subscribe(val => console.log(val));

const source = observable.pipe(
  tap(blockNumber => console.log(`newBlock ${blockNumber}`)),
  concatMap(blockNumber => new Observable(subscribe => {
    setTimeout(() => {
      subscribe.next(`data from block ${blockNumber}`);
      subscribe.complete();
    }, 2000);
  }))
);

const subscribe = source.subscribe(data => console.log(`Rendering ${data}`));
