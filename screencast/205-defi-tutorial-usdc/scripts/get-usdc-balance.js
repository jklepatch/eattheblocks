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

  const usdcBalance = await usdc.balanceOf(account.address);
  console.log(`USDC Balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`);
}

main();
