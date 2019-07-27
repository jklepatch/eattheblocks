pragma solidity ^0.5.0;


contract MyContract {
  uint public date;
  function setDate(uint _date) external {
    date = _date;
  }
}
