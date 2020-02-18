pragma solidity ^0.5.9;

contract Loop {
  function sumSolidity(uint[] memory _data) pure public returns(uint sum) {
    uint sum;
    for(uint i = 0; i < _data.length; i++) {
      sum += _data[i];
    }
  }

  function sumAssembly(uint[] memory _data) pure public returns(uint sum) {
    assembly {
      // Load the length (first 32 bytes)
      let len := mload(_data)
      // Skip over the length field.
      let data := add(_data, 0x20)
      for
        { let end := add(data, mul(len, 0x20)) }
        lt(data, end)
        { data := add(data, 0x20) }
      {
        sum := add(sum, mload(data))
      }
    }
  }
}
