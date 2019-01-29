pragma solidity ^0.5.0;


contract Storage {
  string private data;

  constructor() public {
  }

  function set(string memory _data) public {
    data = _data;
  }

  function get() view external returns(string memory) {
    return data;
  }
}
