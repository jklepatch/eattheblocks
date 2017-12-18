pragma solidity ^0.4.4;

contract MyBaseContract {
  uint innerVal = 100;
  function innerAdd10(uint val) constant returns (uint) {
    return val + 10;
  }
}

contract MyContract is MyBaseContract {
  function outerAdd10(uint val) constant returns (uint) {
    return MyBaseContract.innerAdd10(val);
  }
  
  function getInnerVal() returns(uint) {
    return MyBaseContract.innerVal;
  }
}
