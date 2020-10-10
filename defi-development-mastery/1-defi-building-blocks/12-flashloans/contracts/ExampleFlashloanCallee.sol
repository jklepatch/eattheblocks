pragma solidity ^0.7.2;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './Flashloan.sol';
import './IFlashloanCallee.sol';

contract ExampleFlashloanCallee is IFlashloanCallee {
  function startFlashloan(
    address flashloan, 
    uint amount, 
    address token
  ) 
    external 
  {
    Flashloan(flashloan).executeFlashloan(
      address(this), 
      amount, 
      token, 
      bytes('')
    );
  }

  function flashloanCallback(
    uint amount, 
    address token, 
    bytes memory data
  ) 
    override
    external 
  {
    //do some arbitrage, liquidation, etc..
    IERC20(token).transfer(msg.sender, amount);
  }
}
