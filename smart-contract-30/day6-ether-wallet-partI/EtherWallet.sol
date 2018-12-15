pragma solidity ^0.5.0;

contract EtherWallet {
  function deposit() payable public {
  }

  function send(address payable to, uint amount) public {
    if(msg.sender == owner) {
      to.transfer(amount);
    }
  }
}
