pragma solidity ^0.7.0;

import './Oracle.sol'l

contract MyContract {
  Oracle public oracle;

  constructor(address oracleAddress) {
    oracle = Oracle(oracleAddress);
  }

  function pushBased() external {
    bytes32 = 
    (bool result, uint payload) = oracle.readData(key);

    if(result) {
      //use payload
    }
  }

  function pullBased() external {
  }
}
