pragma solidity ^0.8.6;

contract Proxy {
  bytes32 private constant _ADMIN_SLOT = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;
  bytes32 private constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

  constructor() {
    bytes32 slot = _ADMIN_SLOT;
    address _admin = msg.sender;
    assembly {
      sstore(slot, _admin)
    }
  }

  function admin() public view returns (address adm) {
    bytes32 slot = _ADMIN_SLOT;
    assembly {
      adm := sload(slot)
    }
  }

  function implementation() public view returns (address impl) {
    bytes32 slot = _IMPLEMENTATION_SLOT;
    assembly {
      impl := sload(slot)
    }
  }

  function upgrade(address newImplementation) external {
    require(msg.sender == admin(), 'admin only');
    bytes32 slot = _IMPLEMENTATION_SLOT;
    assembly {
      sstore(slot, newImplementation)
    }
  }

  fallback() external payable {
    assembly {
      let _target := sload(_IMPLEMENTATION_SLOT)
      calldatacopy(0x0, 0x0, calldatasize())
      let result := delegatecall(gas(), _target, 0x0, calldatasize(), 0x0, 0)
      returndatacopy(0x0, 0x0, returndatasize())
      switch result case 0 {revert(0, 0)} default {return (0, returndatasize())}
    }
  }
}
