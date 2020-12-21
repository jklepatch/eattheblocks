pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './LpTokens.sol';

//WIP
contract AutomatedMarketMaker is LpTokens {
  IERC20 public tokenA;
  IERC20 public tokenB;

  constructor(address _tokenA, address _tokenB) {
    tokenA = IERC20(_tokenA);
    tokenB = IERC20(_tokenB);
  }

  function deposit(uint amountA, uint amountB) external {
    uint reserveA = tokenA.balanceOf(address(this));
    uint reserveB = tokenB.balanceOf(address(this));
    tokenA.transferFrom(msg.sender, address(this), amountA);
    tokenB.transferFrom(msg.sender, address(this), amountB);
    uint amountA = tokenA.balanceOf(address(this)) - reserveA;
    uint amountB = tokenB.balanceOf(address(this)) - reserveB;

    //reserveA * reserveB == amountA * amountB
    //require(amountA > reserveA * reserveB / amountB);


    //uint exchangeRate = getEchangeRate();
    uint exchangeRate = reserveA == 0 ? 10 ** 18 : totalSupply() * 10 ** 18 / amountA;
    //uint excha totalSupply() / res
    _mint(msg.sender, amountA * exchangeRate / 10 ** 18);
  }

  function withdraw(uint lpTokenAmount) external {
    require(balanceOf(msg.sender) >= lpTokenAmount, 'not enough lp token');
    uint reserveA = tokenA.balanceOf(address(this));
    uint reserveB = tokenB.balanceOf(address(this));
    uint exchangeRateA = totalSupply() * 10 ** 18 / amountA;
    uint exchangeRateB = totalSupply() * 10 ** 18 / amountB;
    uint 
    //uint amountA = reserveA == 0 ? 10 ** 18 : totalSupply() * 10 ** 18 / amountA;
    _burn(msg.sender, lpTokenAmount);
    tokenA.transfer(msg.sender, amountA);
    tokenB.transfer(msg.sender, amountB);
    
  }

  function swap(uint amountA) external {
  }

  //function getExchangeRate(uint amountA) public {
  //  if(exchangeRate) == 0) {
  //    return amountA;
  //  }
  //  totalSupply() 
  //  uint oldExchangeRate = oldExchangeRate; 
  //  uint reserveA = tokenA.balanceOf(address(this));

  //  quote(
  //  uint reserveA = tokenA.balanceOf(address(this));
  //  uint reserveB = tokenB.balanceOf(address(this));
  //  amountB = amountA.mul(reserveB) / reserveA;

  //  amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);

  //  amount0 * totalSupply / reserve0 
  //  amount1 * _totalSupply / _reserve1;

  //  = .mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
  //}

  function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
    require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
    require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
    amountB = amountA.mul(reserveB) / reserveA;
  }
}
