pragma solidity ^0.5.2;

contract Storage {
    string private data;
    uint[] public numbers = [1,2,3];
    mapping(uint => string) public map;

    constructor() public {
      map[0] = 'firstValue';
      map[1] = 'secondValue';
    }
    
    function set(string calldata _data) external {
        data = _data;
    }

    function get() view external returns(string memory) {
      return data;
    }
}



