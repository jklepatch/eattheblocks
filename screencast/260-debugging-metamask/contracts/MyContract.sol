pragma solidity ^0.7.5;

contract MyContract {
  uint public data;

  function updateData(uint _data) external {
    data = _data;
  }

  function willThrow() external {
    require(false, 'this is the error message');
  }
}


