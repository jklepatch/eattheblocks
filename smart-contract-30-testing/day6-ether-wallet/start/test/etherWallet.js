const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', () => {
  let etherWallet = null;
  before(async () => {
    etherWallet = await EtherWallet.deployed();
  });
});
