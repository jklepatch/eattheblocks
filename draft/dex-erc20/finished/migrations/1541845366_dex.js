const Dex = artifacts.require('Dex');
const WETH = artifacts.require('WETH');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');

module.exports = async(deployer, _network, accounts) => {
  await deployer.deploy(WETH, {from: accounts[1]});
  await deployer.deploy(EOS, {from: accounts[2]});
  await deployer.deploy(OMG, {from: accounts[3]});
  const weth = await WETH.deployed();
  const eos = await EOS.deployed();
  const omg = await OMG.deployed();

  await deployer.deploy(
    Dex, 
    ['WETH', 'EOS', 'OMG'].map((ticker) => web3.utils.asciiToHex(ticker)),
    [weth.address, eos.address, omg.address],
    {from: accounts[0]}
  );
  
  await Promise.all([
    weth.transfer(accounts[4], 1000, {from: accounts[1]}),
    eos.transfer(accounts[4], 1000, {from: accounts[2]}),
    omg.transfer(accounts[4], 1000, {from: accounts[3]}),
    weth.transfer(accounts[5], 1000, {from: accounts[1]}),
    eos.transfer(accounts[5], 1000, {from: accounts[2]}),
    omg.transfer(accounts[5], 1000, {from: accounts[3]}),
  ]);

  await Promise.all([
    weth.approve(Dex.address, 1000, {from: accounts[4]}),
    eos.approve(Dex.address, 1000, {from: accounts[4]}),
    omg.approve(Dex.address, 1000, {from: accounts[4]}),
    weth.approve(Dex.address, 1000, {from: accounts[5]}),
    eos.approve(Dex.address, 1000, {from: accounts[5]}),
    omg.approve(Dex.address, 1000, {from: accounts[5]}),
  ]);
};
