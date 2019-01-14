pragma solidity ^0.5.2;

/**
 * DAO contract:
 * 1. collects investors money (ether) & allocate shares
 * 2. Allow investors to transfer shares
 * 3. allow investment proposals to be created and voted
 * 4. execute successful investment proposals (i.e send money)
 */

contract DAO {
  mapping(address => bool) public investors;
  mapping(address => uint) public shares;
  uint public availableFunds;
  uint public contributionEnd;
  uint public totalShares;

  constructor(
    uint contributionTime, 
    ) public {
    contributionEnd = now + contributionTime;
  }

  function contribute() payable external {
    require(now < contributionEnd, 'cannot contribute after contributionEnd');
    investors[msg.sender] = true;
    shares[msg.sender] += msg.value;
    totalShares += msg.value;
    availableFunds += msg.value;
  }
    
  function transferShare(uint amount, address to) external {
    require(shares[msg.sender] >= amount, 'not enough shares');
    shares[msg.sender] -= amount;
    shares[to] += amount;
    investors[to] = true;
  }
}
