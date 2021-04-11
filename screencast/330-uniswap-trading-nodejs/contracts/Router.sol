pragma solidity ^0.8.0;

contract Router {
  function swapExactTokensForTokens(
    uint amountIn,
    uint amountOutMin,
    address[] calldata path,
    address to,
    uint deadline
  ) external returns (uint[] memory amounts) {} 
  function getAmountsOut(
    uint amountIn, 
    address[] memory path
  )
    public
    view
    returns (uint[] memory amounts) {}
}
