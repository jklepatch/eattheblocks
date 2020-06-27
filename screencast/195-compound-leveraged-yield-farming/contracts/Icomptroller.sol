pragma solidity ^0.6.0;

interface Icomptroller {
  function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);
}
