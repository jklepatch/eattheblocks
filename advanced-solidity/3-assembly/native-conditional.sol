pragma solidity ^0.7.1;

contract MyContract {
  function nativeConditional(uint arg) external returns(uint result) {
    if(arg == 1) {
      return 11;
    } else if(arg == 2) {
      return 22;
    }
    return 33;
  }

  //not recommended, but can save on gas
  function assemblyConditionial(uint value) external returns(uint result) {
    assembly {
      switch value
      case 1 {
        result := 11
      }
      case 2 {
        result := 22
      }
      default {
        result := 33
      }
    }
  }
}
