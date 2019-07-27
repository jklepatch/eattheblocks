pragma solidity ^0.5.2;

contract Strings {
  function length(string memory str) pure public returns(uint) {
    bytes memory str_bytes = bytes(str);
    return str_bytes.length;
  }

  function concatenate(string memory str1, string memory str2) pure public returns(string memory) {
    bytes memory str_bytes1 = bytes(str1);
    bytes memory str_bytes2 = bytes(str2);
    string memory str = new string(str_bytes1.length + str_bytes2.length);
    bytes memory str_bytes = bytes(str);

    uint k = 0;
    for(uint i = 0; i < str_bytes1.length; i++) {
      str_bytes[k] = str_bytes1[i];
      k++;
    }
    for(uint i = 0; i < str_bytes2.length; i++) {
      str_bytes[k] = str_bytes2[i];
      k++;
    }

    return string(str_bytes);
  }
}
