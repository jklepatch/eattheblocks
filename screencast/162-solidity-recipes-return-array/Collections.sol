pragma solidity 0.6.4;
pragma experimental ABIEncoderV2;

contract Collections {
    struct User {
        address userAddress;
        uint balance;
    }
    User[] users;
    
    function getUsers1() external returns(address[] memory, uint[] memory) {
        address[] memory userAddresses = new address[](users.length);
        uint[] memory balances = new uint[](users.length);
        
        for(uint i = 0; i < users.length; i++) {
            userAddresses[i] = users[i].userAddress;
            balances[i] = users[i].balance;
        }
        return (userAddresses, balances);
    }
    
     function getUsers2() external returns(User[] memory) {
        return users;
     }
}
