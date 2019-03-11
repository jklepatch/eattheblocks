pragma solidity ^0.5.0;


contract MyContract {
  uint public date;
  uint public end;
  function setDate(uint _date) external {
    date = _date;
  }
  function setEnd(uint delay) external {
    end = now + delay;
  }
}
