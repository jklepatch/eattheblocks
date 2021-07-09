pragma solidity ^0.8.6;

contract V2 {
  uint public var1;
  uint public var2;

  function updateVar1(uint _var1) external {
    var1 = _var1;
  }

  function updateVar2(uint _var2) external {
    var2 = _var2;
  }
}
