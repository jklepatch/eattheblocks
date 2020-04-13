pragma solidity ^0.6.0;

import "./Attacker.sol";

contract Victim {
  mapping(address => uint) public balances;
  Attacker attacker;
  bool locked;

  //Solution 1: use transfer() to send ether
  function withdraw1(uint amount) external {
    require(balances[msg.sender] >= amount);
    msg.sender.transfer(amount);
    balances[msg.sender]--;
  }

  //Solution 2: move state change before sending ether
  function withdraw2(uint amount) external {
    require(balances[msg.sender] >= amount);
    balances[msg.sender]--;
    msg.sender.call.value(amount)("")
  }

  //Solution 3: use lock mutex 
  function withdraw3(uint amount) external {
    require(locked == false);
    locked = true;
    require(balances[msg.sender] >= amount);
    msg.sender.call.value(amount)("")
    balances[msg.sender]--;
    locked = false;
  }
}
