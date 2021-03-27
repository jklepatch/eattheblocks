const ethers = require('ethers');
const Factory = require('../build/contracts/UniswapFactoryMock.json');

const init = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
  const mnemonic = 'practice bargain mobile drink junk never cigar winner morning trophy vague response';
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  const account = wallet.connect(provider);
  const factory = new ethers.Contract(
    Factory.networks['5777'].address,
    Factory.abi,
    account
  );
  const tx = await factory.createPair(
    '0x2cfb04529afed0ceeb3e7518130e1843276c829b',
    '0x63bba01d8d9fe2362a6ec016972dba0ca628c6e1'
  );
  const receipt = await tx.wait();
  console.log('Pair created');
  console.log(receipt);
}
init();
