const Web3 = require('web3');

const myProvider1 = {
  sendAsync: (payload, cb) => {
    console.log('you called');
    console.log(payload);
    cb(undefined, []);
  }
};

const provider2 = new Web3.providers.HttpProvider('http://localhost:8545');
console.log(provider2);
//provider2.addProvider(
//  {
//    handleRequest: (payload, next, end) => {
//      console.log('you called');
//      console.log(payload);
//      end(undefined, []);
//    }
//  },
//  0
//);


//const web3 = new Web3(provider2); 
//web3.eth.getAccounts()
//.then(() => console.log('finished'));
