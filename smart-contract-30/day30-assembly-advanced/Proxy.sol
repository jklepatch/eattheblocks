pragma solidity ^0.5.9;

contract Proxy {
  address admin;
  address implementation;

  constructor() public {
    admin = msg.sender;
  }

  function update(address _implementation) external {
    implementation = _implementation;
  }

  /**
  * This function will return whatever the implementation call returns
  */
  function () payable public {
    require(implementation != address(0));
    address impl = implementation;

    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize)
      let result := delegatecall(gas, impl, ptr, calldatasize, 0, 0)
      let size := returndatasize
      returndatacopy(ptr, 0, size)

      switch result
      case 0 { revert(ptr, size) }
      default { return(ptr, size) }
    }
  }
}
