pragma solidity ^0.5.6;

contract Assembly {
  function A() isHuman() {
    //we are sure that caller is not a smart contract
  }

  modifier isHuman() {
    address _addr = msg.sender;
    uint256 _codeLength;
    
    assembly {_codeLength := extcodesize(_addr)}
    require(_codeLength == 0, "sorry humans only");
    _;
  }
}
