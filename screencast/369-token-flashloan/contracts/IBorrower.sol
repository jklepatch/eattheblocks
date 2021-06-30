pragma solidity ^0.8.6;

interface IBorrower {
  function startFlashloan(address token, uint amount) external;
  function onExecuteFlashloan(address token, uint amount) external;
}
