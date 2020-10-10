pragma solidity ^0.5.0;

contract LiquidityPool {
  function deposit(uint amountA, uint amountB) external {
    tokenA.transferFrom(msg.sender, address(this), amountA);
    tokenB.transferFrom(msg.sender, address(this), amountB);
  }
  function withdraw() external {
  }

  function swap(uint amountA) external {
  }
}
