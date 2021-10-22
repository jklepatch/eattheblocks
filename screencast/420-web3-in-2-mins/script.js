const Web3 = require('web3');

const web3 = new Web3('https://mainnet.infura.io/v3/ed18016b210c4a1baf828458bd16feb0');

web3.eth.accounts.wallet.add('0x55d0380decced82a2198582e541a129e8b86937c30a1c51bbb5327b9f00c6aa4');

web3.eth.getBalance('0xFA17F09e8464Bd0c592Daf09bf285B5cD72Bec3D')
.then(balance => console.log(balance));

const contract = new web3.eth.Contract(abi, '0x6E62c6e07019Bc3db5554a8d602390C6CC0B7846');

contract.methods.read().call()
.then(result => console.log(result));

web3.eth.sendTransaction({from: '0xFA17F09e8464Bd0c592Daf09bf285B5cD72Bec3D', value: 1000})

contract.methods.write().sendTransaction({from: '0xFA17F09e8464Bd0c592Daf09bf285B5cD72Bec3D'});
