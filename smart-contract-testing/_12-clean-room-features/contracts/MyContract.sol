pragma solidity ^0.5.0;

contract MyContract {
  string public data;

  function set(string memory _data) public {
    data = _data;
  }
}


