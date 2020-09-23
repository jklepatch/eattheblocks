pragma solidity ^0.7.1;

contract MyContract {
  function nativeLoop() external returns(uint result) {
    for(uint i = 0; i< 10; i++) {
      result++;
    }
  }

  //not recommended, but can save on gas
  function assemblyLoop() external returns(uint result) {
    assembly {
      let i: =0
      loop:
      i := add(i, 1)
      result := add(result, 1)
      jumpi(loop, lt(i, 10))
    }
  }
}
