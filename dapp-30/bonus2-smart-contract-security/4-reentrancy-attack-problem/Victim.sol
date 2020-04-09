pragma solidity ^0.6.0;

import "./Attacker.sol";

contract Victim {
  mapping(address => uint) public balances;
  Attacker attacker;

  function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    msg.sender.call.value(amount)("");
    balances[msg.sender]--;
  }
}
