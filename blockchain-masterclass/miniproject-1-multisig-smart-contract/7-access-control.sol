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
  mapping(address => mapping(uint => bool)) public approvals;
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

  function createTransfer(uint amount, address payable to) external onlyApprover() {
    transfers[nextId] = Transfer(
      nextId,
      amount,
      to,
      0,
      false
    );
    nextId++;
  }

  function approveTransfer(uint id) external onlyApprover() {
    require(transfers[id].sent == false, 'transfer has already been sent');
    require(approvals[msg.sender][id] == false, 'cannot approve transfer twice');

    approvals[msg.sender][id] = true;
    transfers[id].approvals++;

    if(transfers[id].approvals >= quorum) {
      transfers[id].sent = true;
      address payable to = transfers[id].to;
      uint amount = transfers[id].amount;
      to.transfer(amount);
    }
  }

  receive() external payable {}

  modifier onlyApprover() {
    bool allowed = false;
    for(uint i; i < approvers.length; i++) {
      if(approvers[i] == msg.sender) {
        allowed = true;
      }
    }
    require(allowed == true, 'only approver allowed');
    _;
  }
}
