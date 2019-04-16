pragma solidity ^0.5.0;

contract Storage {
  string private data;

  function set(string calldata _data) external {
    data = _data;
  }

  function publicGet() external view returns(string memory) {
    return privateGet();
  }

  function privateGet() internal view returns(string memory) {
    return data;
  }
}
