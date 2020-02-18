pragma solidity ^0.5.9;

contract IsContract {
  function isContract(address addr) view external returns(bool) {
    uint256 codeLength;
    
    assembly {codeLength := extcodesize(addr)}
    return codeLength == 0 ? false : true;
  }
}
