const DEX = artifacts.require('Dex');
const WETH = artifacts.require('WETH');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');
const TESTTOKEN = artifacts.require('TestToken');
const { artifactToWeb3 } = require('../utils');

module.exports = async (deployer, _network, accounts) => {
  const dexAdmin = accounts[0];
  const wethAdmin = accounts[1];
  const eosAdmin = accounts[2];
  const omgAdmin = accounts[3];
  const testTokenAdmin = accounts[4];
  const buyer = accounts[5];
  const seller = accounts[6];

  // Deploy ERC20 tokens
  await deployer.deploy(WETH, {from: wethAdmin});
  await deployer.deploy(EOS, {from: eosAdmin});
  await deployer.deploy(OMG, {from: omgAdmin});
  await deployer.deploy(TESTTOKEN, {from: testTokenAdmin});
  const weth = await artifactToWeb3(WETH, web3); 
  const eos = await artifactToWeb3(EOS, web3); 
  const omg = await artifactToWeb3(OMG, web3); 

  // Deploy Dex 
  await deployer.deploy(DEX);
  const dex = await artifactToWeb3(DEX, web3); 

  // Add tokens to Dex
  const tokens = [
    {ticker: 'WETH', at: weth.options.address},
    {ticker: 'EOS', at: eos.options.address},
    {ticker: 'OMG', at: omg.options.address}
  ];
  await Promise.all(tokens.map(token => {  
    return dex.methods
      .addToken(
        web3.utils.fromAscii(token.ticker),
        token.at
      )
      .send({
        from: dexAdmin,
        gas: 200000
      }); 
  }));

  // Seed tokens
  await Promise.all([
    weth.methods
      .transfer(buyer, 1000)
      .send({from: wethAdmin}),
    eos.methods
      .transfer(buyer, 1000)
      .send({from: eosAdmin}),
    omg.methods
      .transfer(buyer, 1000)
      .send({from: omgAdmin}),
    weth.methods
      .transfer(seller, 1000)
      .send({from: wethAdmin}),
    eos.methods
      .transfer(seller, 1000)
      .send({from: eosAdmin}),
    omg.methods
      .transfer(seller, 1000)
      .send({from: omgAdmin}),
  ]);

  await Promise.all([
    weth.methods
      .approve(dex.options.address, 1000)
      .send({from: buyer}),
    eos.methods
      .approve(dex.options.address, 1000)
      .send({from: buyer}),
    omg.methods
      .approve(dex.options.address, 1000)
      .send({from: buyer}),
    weth.methods
      .approve(dex.options.address, 1000)
      .send({from: seller}),
    eos.methods
      .approve(dex.options.address, 1000)
      .send({from: seller}),
    omg.methods
      .approve(dex.options.address, 1000)
      .send({from: seller}),
  ]);
};
