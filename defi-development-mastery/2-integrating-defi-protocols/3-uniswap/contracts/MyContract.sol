pragma solidity ^0.7.3;

interface IUniswap {
  function swapExactTokensForETH(
    uint amountIn, 
    uint amountOutMin, 
    address[] calldata path, 
    address to, 
    uint deadline)
    external
    returns (uint[] memory amounts);
  function WETH() external pure returns (address);
}

interface IERC20 {
  function transferFrom(
    address sender, 
    address recipient, 
    uint256 amount) 
    external 
    returns (bool);
}

contract MyDeFiProject {
  IUniswap uniswap;

  constructor(address _uniswap) {
    uniswap = IUniswap(_uniswap);
  }

  function swapTokensForEth(address token, uint amountIn, uint amountOutMin, uint deadline) external {
    IERC20(token).transferFrom(msg.sender, address(this), amountIn);
    address[] memory path = new address[](2);
    path[0] = address(DAI);
    path[1] = uniswap.WETH();
    IERC20(token).approve(address(uniswap), amountIn);
    uniswap.swapExactTokensForETH(
      amountIn, 
      amountOutMin, 
      path, 
      msg.sender, 
      deadline
    );
  }
}
