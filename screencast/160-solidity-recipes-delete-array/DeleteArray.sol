pragma solidity ^0.6.0;

contract MyContract {
  string[] public data;

  constructor() public {
    data.push("John");
    data.push("Bruce");
    data.push("Tom");
    data.push("Bart");
    data.push("Cherry");
  }

  function removeNoOrder(uint index) external {
    data[index] = data[data.length - 1];
    data.pop();
  }

  function removeInOrder(uint index) external {
    for(uint i = index; i <  data.length - 1; i++) {
      data[i] = data[i + 1];
    }
    data.pop();
  }
}
