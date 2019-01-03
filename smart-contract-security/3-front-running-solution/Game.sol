pragma solidity ^0.5.2;

contract Game {
  bytes32 constant public hash = 0xb5b5b97fafd9855eec9b41f74dfb6c38f5951141f9a3ecd7f44d5479b630ee0a;
  mapping(address => bytes32) commits;
  constructor() public payable {}

  function commit(bytes32 solution_hash) public {
    commits[msg.sender] = solution_hash;
  }
  
  function reveal(bytes memory solution) public {
    require(hash == keccak256(solution));
    require(commits[msg.sender] == keccak256(solution));
    msg.sender.transfer(address(this).balance);
  }
}
