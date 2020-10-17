pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './FlashloanProvider.sol';
import './IFlashloanUser.sol';

contract ExampleFlashloanUser is IFlashloanUser {
  function startFlashloan(
    address flashloan, 
    uint amount, 
    address token
  ) 
    external 
  {
    FlashloanProvider(flashloan).executeFlashloan(
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

    //Reimburse borrowed tokens
    IERC20(token).transfer(msg.sender, amount);
  }
}
