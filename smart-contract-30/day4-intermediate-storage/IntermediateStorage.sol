pragma solidity ^0.5.0;

contract IntermediateStorage {
  uint[] ids;

  function add(uint id) public {
    ids.push(id);
  }

  function get() view public returns(uint) {
    return ids;
  }

  function length() view public returns(uint) {
    return ids.length;
  }
}
