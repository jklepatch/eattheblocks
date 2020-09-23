pragma solidity ^0.7.0;

contract Oracle {
  mapping(bytes32 => uint) public keys;
  address public admin;

  constructor() {
    admin = msg.sender;
  }

  function updateDataAndCallback(bytes32 key, uint value) external {
    require(msg.sender == admin, 'only admin');
    keys[key] = value;
    callbacks[msg.sender]
  }

  function updateData(bytes32 key, uint value) external {
    require(msg.sender == admin, 'only admin');
    keys[key] = value;
  }

  function readData(bytes32 key, uint value) external {
    require(msg.sender == admin, 'only admin');
    keys[key] = value;
  }
}
