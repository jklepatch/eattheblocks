pragma solidity ^0.5.0;

import "@openzeppelin/contracts/lifecycle/Pausable.sol";

contract MyContract is Pausable {

  constructor() Pausable() public {} 

  function foo() whenNotPaused() external {
    //do something
  }

  function bar() whenPaused() external {
    //do something
  }
}
