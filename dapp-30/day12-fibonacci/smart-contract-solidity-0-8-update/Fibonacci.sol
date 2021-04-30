pragma solidity ^0.8.0;

contract Fibonacci {
  function fib(uint n) pure external returns(uint) {
    if(n == 0) {
      return 0;
    }
    uint fi_1 = 1;
    uint fi_2 = 1;
    for(uint i = 2; i < n; i++) {
      uint fi = fi_1 + fi_2;
      fi_2 = fi_1;
      fi_1 = fi;
    }
    return fi_1;
  }
}
