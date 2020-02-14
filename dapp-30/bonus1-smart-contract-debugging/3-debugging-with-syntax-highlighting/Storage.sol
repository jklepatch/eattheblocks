pragma solidity ^0.5.2;

contract Storage {
    string private data;
    
    function set(string calldata _data) external {
        data = _data;
    }
}



