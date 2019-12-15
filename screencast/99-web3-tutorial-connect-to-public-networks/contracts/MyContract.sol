pragma solidity ^0.5.0;

contract MyContract {
  uint data;

  function setData(uint _data) external {
    data = _data;
  }

  function getData() external view returns(uint) {
    return data;
  }
}
