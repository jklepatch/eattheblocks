pragma solidity ^0.5.2;

/**
 * DAO contract:
 * 1. Collects investors money (ether)
 * 2. Keep track of investor contributions with shares
 * 3. Allow investors to transfer shares
 * 4. allow investment proposals to be created and voted
 * 5. execute successful investment proposals (i.e send money)
 */

contract DAO {
  mapping(address => bool) public investors;
  mapping(address => uint) public shares;
  uint public totalShares;
  uint public availableFunds;
  uint public contributionEnd;

  constructor(uint contributionTime) public {
    contributionEnd = now + contributionTime;
  }

  function contribute() payable external {
    require(now < contributionEnd, 'cannot contribute after contributionEnd');
    investors[msg.sender] = true;
    shares[msg.sender] += msg.value;
    totalShares += msg.value;
    availableFunds += msg.value;
  }
}
