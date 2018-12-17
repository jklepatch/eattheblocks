pragma solidity ^0.5.0;

contract SplitPayment {
  function send(address payable[] memory to, uint[] memory amount ) 
    payable 
    public {
    require(to.length == amount.length, 'to must be same length as amount');
    for(uint i = 0; i < to.length; i++) {
      to[i].transfer(amount[i]);
    }
  }
}
