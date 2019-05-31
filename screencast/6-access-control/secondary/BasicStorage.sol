pragma solidity ^0.5.8;

import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Secondary.sol';

contract BasicStorage is Secondary {
  string public data;

  constructor() public Secondary() {}

  function setData(string calldata _data) external onlyPrimary() {
    data = _data;
  }
}
