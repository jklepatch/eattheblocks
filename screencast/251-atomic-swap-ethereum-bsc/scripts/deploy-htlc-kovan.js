const HTLC = artifacts.require('HTLC.sol');

module.exports = async callback => {
  const [bob, alice] = await web3.eth.getAccounts();
  const tokenA = await Token.deployed();
  const htlc = await HTLC.new(
    alice,
    tokenA.address,
    1,
    {from: bob}
  );
  console.log(htlc.address);
  await tokenA.approve(htlc.address, 1); 
  
  callback();
}
