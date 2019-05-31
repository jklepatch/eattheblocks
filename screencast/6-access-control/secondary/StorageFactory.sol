pragma solidity ^0.5.8;

import 'browser/BasicStorage.sol';

contract StorageFactory {
    address[] public basicStorageAddresses;
    
    function createStorage() external {
        address basicStorageAddress = address(new BasicStorage());
        basicStorageAddresses.push(basicStorageAddress);
    }
    
    function setData(uint _index, string calldata _data) external {
        require(_index < basicStorageAddresses.length, 'This _index does not exist');
        BasicStorage basicStorage = BasicStorage(basicStorageAddresses[_index]);
        basicStorage.setData(_data);
    }
}
