pragma solidity ^0.5.8;

contract BasicAccessControl {
    address public admin;
    
    constructor() public {
        admin = msg.sender;
    }
    
    function publicFunction() external {}
    
    function privateFunction1() external onlyAdmin() {
    }
    
    function privateFunction2() external onlyAdmin() {
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin');
        _;
    }
}
