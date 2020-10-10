pragma solidity ^0.7.2;

interface IFlashloanCallee {
  function flashloanCallback(uint amount, address token, bytes memory data) external;
}
