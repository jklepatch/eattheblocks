pragma solidity ^0.8.6;

import './Token.sol';
import './IBorrower.sol';

contract GoodBorrower is IBorrower {
  function startFlashloan(address token, uint amount) external override {
    Token(token).executeFlashloan(amount);
  }

  function onExecuteFlashloan(address token, uint amount) external override {
    //Use money of flashloan here (arbitrage, liquidation...)
    //Make sure to have enough token to reimburse the flashloan at the end
    //If that is not the case, the transaction will fail
  }
}
