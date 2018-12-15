pragma solidity ^0.5.0;

contract EtherWallet {
  address payable public owner;

  constructor(address payable _owner) public {
    owner = _owner;
  }

  function deposit() payable public {
  }

  function send(address payable to, uint amount) public {
    if(msg.sender == owner) {
      to.transfer(amount);
      return;
    } 
    revert('only owner can send transfers');
  }
}
