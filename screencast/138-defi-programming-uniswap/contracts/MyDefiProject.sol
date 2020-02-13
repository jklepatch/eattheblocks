pragma solidity ^0.5.0;

import './IUniswapFactory.sol';
import './IUniswapExchange.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract MyDeFiProject {
  UniswapFactoryInterface uniswapFactory;

  function setup(address factoryAddress) external { 
    uniswapFactory = UniswapFactoryInterface(factoryAddress);
  }

  function getUniswapExchange(address token) public view returns(UniswapExchangeInterface) {
    return UniswapExchangeInterface(uniswapFactory.getExchange(token));
  }

  function createNewExchange(address token) external {
    uniswapFactory.createExchange(token);
  }

  function buy(address token, uint tokenAmount) external payable {
    UniswapExchangeInterface uniswapExchange = getUniswapExchange(token);
    uint ethAmount = uniswapExchange.getEthToTokenOutputPrice(tokenAmount);
    uniswapExchange.ethToTokenTransferInput.value(ethAmount)(tokenAmount, now + 120, address(this));
  }

  function addLiquidity(address token, uint tokenAmount) external payable {
    UniswapExchangeInterface uniswapExchange = getUniswapExchange(token);
    IERC20(token).approve(address(uniswapExchange), tokenAmount);
    uniswapExchange.addLiquidity.value(msg.value)(0, tokenAmount, now + 120); 
  }
}


