const Token = artifacts.require('Token.sol');
const HTLC = artifacts.require('HTLC.sol');

module.exports = async function (deployer, network, addresses) {
  const [bob, alice] = addresses;      

  if(network === 'kovan') {
    await deployer.deploy(Token, 'Token A', 'TKNA', {from:  bob});
    const tokenA = await Token.deployed();
    await deployer.deploy(HTLC, alice, tokenA.address, 1, {from: bob});
    const htlc = await HTLC.deployed();
    await tokenA.approve(htlc.address, 1, {from: bob});
    await htlc.fund({from: bob});
  }
  if(network === 'binanceTestnet') {
    await deployer.deploy(Token, 'Token B', 'TKNB', {from: alice});
    const tokenB = await Token.deployed();
    await deployer.deploy(HTLC, bob, tokenB.address, 1, {from: alice});
    const htlc = await HTLC.deployed();
    await tokenB.approve(htlc.address, 1, {from: alice});
    await htlc.fund({from: alice});
  }
};
