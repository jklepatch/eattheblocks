pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract Wallet {
  address[] public approvers;
  uint public quorum;
  struct Transfer {
    uint id;
    uint amount;
    address payable to;
    uint approvals;
    bool sent;
  }
  mapping(uint => Transfer) public transfers;
  uint public nextId;

  constructor(address[] memory _approvers, uint _quorum) payable public {
    approvers = _approvers;
    quorum = _quorum;
  }

  function getApprovers() external view returns(address[] memory) {
    return approvers;
  }

  function getTransfers() external view returns(Transfer[] memory) {
    Transfer[] memory _transfers = new Transfer[](nextId);
    for(uint i = 0; i < _transfers.length; i++) {
      _transfers[i] = transfers[i];
    }
    return _transfers;
  }

  function createTransfer(uint amount, address payable to) external {
    transfers[nextId] = Transfer(
      nextId,
      amount,
      to,
      0,
      false
    );
    nextId++;
  }
}
