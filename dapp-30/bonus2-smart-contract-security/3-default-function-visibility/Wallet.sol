pragma solidity ^0.4.24;

contract Wallet {
  mapping(address => uint8) public balances;

  function deposit() payable public {
    balances[msg.sender] = balances[msg.sender] + uint8(msg.value);
  }

  function withdraw(uint8 a) public {
    require(balances[msg.sender] - a >= 0, 'Trying to withdraw too much');
    _withdraw(a);
  }

  function _withdraw(uint a) {
    balances[msg.sender] = balances[msg.sender] - uint8(a);
    msg.sender.transfer(a);
  }
  
  function balanceOf() view public returns(uint8){
      return balances[msg.sender];
  }
}
