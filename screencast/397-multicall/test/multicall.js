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

  it('should transfer', async () => {
    const multi = new MultiCall(provider);
    const callParams = [
      {target: token1.address, function: 'balanceOf', args: [admin]},
      {target: token2.address, function: 'balanceOf', args: [admin]}
    ];
    const inputs = [];
    for (let callParam of callParams) {
      inputs.push({ 
        target: callParam.target, 
        function: callParam.function, 
        args: callParam.args
      });
    }
    const tokenDatas = await multi.multiCall(abi, inputs);
  });
});
