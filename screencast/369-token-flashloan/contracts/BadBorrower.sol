pragma solidity ^0.8.6;

import './Token.sol';
import './IBorrower.sol';

contract BadBorrower is IBorrower {
  function startFlashloan(address token, uint amount) external override {
    Token(token).executeFlashloan(amount);
  }

  function onExecuteFlashloan(address token, uint amount) external override {
    //Send all the tokens to a random address
    //Simulate if we do not have enough token to reimburse the flashloan at the end
    Token(token).transfer(0xCeA9398F6F088c6D4c6e3613f506e88eF7b7b98F, amount);
  }
}
