const Web3 = require('web3');

const web3 = new Web3('http://localhost:9545');

const value = 10;
web3.utils.toWei(value.toString(), 'gwei');

web3.utils.fromWei('1000000000', 'gwei')

web3.utils.toBN('1000');
web3.utils.BN
web3.utils.isBN()

web3.utils.hexToAscii(hexString) 
web3.utils.asciiToHex(normalString)
web3.utils.isHex()
web3.utils.toHex()
web3.utils.randomHex(32)

web3.utils.padLeft(hexString, 20)

web3.utils.isAddress()
web3.utils.toChecksumAddress()
web3.utils.checkAddressChecksum()o

web3.utils.sha3(value)
web3.utils.soliditySha3({t: 'uint8', v: 10}, param2, etc...)
