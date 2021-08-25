const ethers = require('ethers');
const { MultiCall } = require('@indexed-finance/multicall');
const { abi } = require('../build/contracts/Token1.json');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

contract('multicall', accounts => {
  let token1, token2, provider; 
  const [admin, _] = accounts;

  beforeEach(async () => {
    token1 = await Token1.new(); 
    token2 = await Token2.new(); 
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
  });

  it('should read the 2 token balances', async () => {
    const multi = new MultiCall(provider);
    const callParams = [
      {target: token1.address, function: 'balanceOf', args: [admin]},
      {target: token2.address, function: 'balanceOf', args: [admin]}
    ];
    const tokenDatas = await multi.multiCall(abi, callParams);
    assert(tokenDatas[1][0].toString() === '1000');
    assert(tokenDatas[1][1].toString() === '1000');
  });
});
