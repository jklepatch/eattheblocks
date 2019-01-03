pragma solidity ^0.5.2;

contract Game {
  bytes32 constant public hash = 0xb5b5b97fafd9855eec9b41f74dfb6c38f5951141f9a3ecd7f44d5479b630ee0a;

  constructor() public payable {}

  function solve(bytes memory solution) public {
    require(hash == sha3(solution));
    msg.sender.transfer(address(this).balance);
  }
}
