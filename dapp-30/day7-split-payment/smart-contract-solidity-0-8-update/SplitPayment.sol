pragma solidity ^0.8.0;

contract SplitPayment {
  address owner;
  
  constructor(address _owner) {
      owner = _owner; 
  }
  
  function send(address payable[] memory to, uint[] memory amount ) 
    payable 
    public 
    ownerOnly {
    require(to.length == amount.length, 'to must be same length as amount');
    for(uint i = 0; i < to.length; i++) {
      to[i].transfer(amount[i]);
    }
  }
  
  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }
}
