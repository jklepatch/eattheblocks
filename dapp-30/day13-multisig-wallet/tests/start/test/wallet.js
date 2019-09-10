const Wallet = artifacts.require('Wallet');

contract('Wallet', (accounts) => {
  let wallet = null;
  before(async () => {
    wallet = await Wallet.deployed();
  });
});
