pragma solidity ^0.6.3;

interface ICToken {
  function mint(uint _amount) external;
  function redeemUnderlying(uint _amount) external;
  function balanceOfUnderlying(address _owner) external view returns(uint);
}
