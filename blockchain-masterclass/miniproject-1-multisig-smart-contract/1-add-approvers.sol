pragma solidity ^0.6.0;

contract MultisigWallet {
 address[] public approvers;
  uint public quorum;

  constructor(address[] memory _approvers, uint _quorum) payable public {
    approvers = _approvers;
    quorum = _quorum;
  }
}
