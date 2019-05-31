pragma solidity ^0.5.8;

import 'github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Roles.sol';

contract RBAC {
    using Roles for Roles.Role;

    Roles.Role private users;
    Roles.Role private admins;
    
    constructor() public {
        admins.add(msg.sender);
    }
    
    function userProtectedFunction() external onlyUser() {}
    
    function adminProtectedFunction() external onlyAdmin() {}
    
    function addUser(address _newUser) external onlyAdmin() {
        users.add(_newUser);
    }
    
    function addAdmin(address _newAdmin) external onlyAdmin() {
        admins.add(_newAdmin);
    }
    
    function removeUser(address _oldUser) external onlyAdmin() {
        users.remove(_oldUser);
    }
    
    function removeAdmin(address _oldAdmin) external onlyAdmin() {
        admins.remove(_oldAdmin);
    }
    
    modifier onlyUser() {
        require(users.has(msg.sender) == true, 'Must have user role');
        _;
    }
    
    modifier onlyAdmin() {
        require(admins.has(msg.sender) == true, 'Must have admin role');
        _;
    }
}
