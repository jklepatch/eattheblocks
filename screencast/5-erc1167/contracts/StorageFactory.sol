pragma solidity ^0.4.23;

import './Storage.sol';
import "./CloneFactory.sol";

contract StorageFactory is CloneFactory {
  address public admin;
  address public implementation;
  address[] public clonedContracts;

  function StorageFactory(address _implementation) public {
    implementation = _implementation;
    admin = msg.sender;
  }

  function createStorage() {
    require(msg.sender == admin, 'Only admin can clone contract');
    address clone = createClone(implementation);
    //Storage(clone).init(myArg); thats how you would initialize the clone if neeeded
    clonedContracts.push(clone);
  }

  function getAddress(uint i) view external returns(address) {
    return clonedContracts[i];
  }
}
