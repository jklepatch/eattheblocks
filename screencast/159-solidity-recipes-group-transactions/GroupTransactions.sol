pragma solidity ^0.6.0;

contract Utils {
  function groupExecute(uint argA, uint argB) external {
    ContractA(0x....).foo(argA);
    ContractB(0x....).bar(argB);
  }
}

contract ContractA {
  function foo(uint arg) external {
    //do something
  }
}

contract ContractB {
  function bar(uint arg) external {
    //do something else
  }
}

