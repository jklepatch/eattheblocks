const ethers = require('ethers');

const mnemonic = 'REPLACE WITH YOUR MNEMONIC HERE';
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);

module.exports = wallet;
