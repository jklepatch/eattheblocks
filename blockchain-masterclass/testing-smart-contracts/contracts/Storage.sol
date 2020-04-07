pragma solidity ^0.6.0;

contract Storage {
  uint data;
  event DataChanged(uint data);

  function get() external view returns(uint) {
    return data;
  }

  function set(uint _data) external {
    data = _data;
    emit DataChanged(_data);
  }

  function willThrowError(uint _data) external {
    require(false == true, 'doh! an error Marge!');
  }
}
