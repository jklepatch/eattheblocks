pragma solidity ^0.5.0;

contract SplitPayment {
  address owner;
  
  constructor(address _owner) public  {
      owner = _owner; 
  }
  
  function send(address[] memory to, uint[] memory amount ) 
    payable 
    public 
    ownerOnly {
    require(to.length == amount.length);
    for(uint i = 0; i < to.length; i++) {
      to[i].transfer(amount[i]);
    }
  }
  
  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }
}
