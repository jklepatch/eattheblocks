pragma solidity ^0.5.0;

import '@openzeppelin/contract/utils/ReentrancyGuard.sol';

interface ReceiverInterface {
  function onReceive() external;
}

contract MyContract is ReentrancyGuard {
  constructor() ReentrancyGuard() public {}

  function withdraw(uint amount) nonReentrant() external {
    //Check if `msg.sender` balance is enough
    //Send `amount` tokens to `msg.sender`
    ReceiverInterface(msg.sender).onReceive();
    //Decrease its balance
  }
}

contract Attacker {
  uint count = 0;

  function start() external {
    onReceive();
  }

  function onReceive() external {
    if(count < 9) {
      count += 1;
      MyContract(0x...).withdraw(1 ether);
    }
  }
}
