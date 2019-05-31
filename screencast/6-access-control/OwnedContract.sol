pragma solidity ^0.5.8;

import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract OwnedContract is Ownable {
    constructor() public Ownable() {}
    
    function publicFunction() external {}
    
    function privateFunction() external onlyOwner() {}
    
    function renounce() external onlyOwner() {
        renounceOwnership();  
    }

}
