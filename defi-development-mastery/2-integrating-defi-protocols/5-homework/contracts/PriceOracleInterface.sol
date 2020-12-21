pragma solidity ^0.7.3;

interface PriceOracleInterface {
  function getUnderlyingPrice(address asset) external view returns(uint);
}
