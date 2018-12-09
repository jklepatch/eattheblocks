pragma solidity ^0.5.0;

contract EtherWallet {
  address owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function deposit() payable public {
  }

  function withdraw(uint amount) public {
    address(owner).transfer(amount);
  }

  function send(uint amount, address to) public {
    if(msg.sender == owner) {
      address(to).transfer(amount);
    }
  }
}
