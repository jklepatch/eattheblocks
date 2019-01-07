pragma solidity ^0.5.2;

contract MultiSig {
  struct Transfer{
    uint id;
    uint amount;
    address payable to;
  }
  mapping(uint => Transfer) transfers;
  uint nextId;
  event TransferCreated(uint id, uint amount, address to);
  event TransferSent(uint id, uint amount, address to);

  function createTransfer(uint amount address payable to) external {
    transfers[nextId] = Transfer(nextId, amount, to);
    emit TransferCreated(nextId, amount, to);
  }

  function sendTransfer(uint id) external {
    uint amount = transfers[id].amount;
    address payable to = transfers[id].to;
    to.transfer(amount);
    emit TransferSent(transfers[id].id, amount, to);
  }

  function() payable external {}
}
