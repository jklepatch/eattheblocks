const ethers = require('ethers');
const wallet = require('./utils/wallet.js');
const provider = require('./utils/provider.js');
const { address, abi } = require('./utils/config.js');

async function main() {
  const account = wallet.connect(provider);

  const usdc = new ethers.Contract(
    address,
    abi,
    account
  );

  const tx = await usdc.gimmeSome({ gasPrice: 20e9 });
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
  console.log(`Gas used: ${receipt.gasUsed.toString()}`);
}

main();
