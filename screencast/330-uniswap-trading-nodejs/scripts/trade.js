const Router = artifacts.require('Router.sol');
const Weth = artifacts.require('Weth.sol');
const Dai = artifacts.require('Dai.sol');

const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const WETH_ADDRESS = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
const DAI_ADDRESS = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'; 

const amountIn = web3.utils.toWei('0.1');

module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    const router = await Router.at(ROUTER_ADDRESS);
    const weth = await Weth.at(WETH_ADDRESS);
    const dai = await Dai.at(DAI_ADDRESS);

    await weth.deposit({value: amountIn}) 
    await weth.approve(router.address, amountIn);

    const amountsOut = await router.getAmountsOut(amountIn, [WETH_ADDRESS, DAI_ADDRESS]);
    const amountOutMin = amountsOut[1]
        .mul(web3.utils.toBN(90))
        .div(web3.utils.toBN(100));
    const balanceDaiBefore = await dai.balanceOf(admin);

    await router.swapExactTokensForTokens(
      amountIn, 
      amountOutMin,
      [WETH_ADDRESS, DAI_ADDRESS],
      admin,
      Math.floor((Date.now() / 1000)) + 60 * 10
    );

    const balanceDaiAfter = await dai.balanceOf(admin);
    const executionPerf = balanceDaiAfter.sub(balanceDaiBefore).div(amountsOut[1]);
    console.log(executionPerf.toString());
  } catch(e) {
    console.log(e);
  }
  done();
};
