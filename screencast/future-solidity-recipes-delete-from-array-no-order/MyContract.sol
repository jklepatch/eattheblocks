pragma solidity ^0.5.14;

contract MyContract {
    struct User {
        address userAddress;
        uint age;
    }
    User[] User; 

    function deleteUser(address _userAddress) external {
      require(users.lengt
      uint i = users.length;
      while(i > 0) {
        if(users[i] = _userAddress) { 
          delete users[i];
          break;
        }
        i--;
      }
    }

    
    function createUser(uint _age) external {
        users[msg.sender] = User(msg.sender, _age);
        userAddresses.push(msg.sender);
    }
    
    
    function getUser(address _userAddress) 
        external 
        view 
        returns(address, uint) {
        return (
            users[_userAddress].userAddress,
            users[_userAddress].age
        );
    }
    
    // only with pragma experimental ABIEncoderV2;
    // function getUsers() external view returns(User[] memory) {
    //     return _users;
    // }
    
    function getUsers() 
        external 
        view 
        returns(
            address[] memory, 
            uint[] memory
        ) {
        address[] memory _addresses = new address[](userAddresses.length);
        uint[] memory _ages = new uint[](userAddresses.length);
        for(uint i = 0; i< userAddresses.length; i++) {
            address _address = userAddresses[i];
            _addresses[i] = users[_address].userAddress;
            _ages[i] = users[_address].age;
        }
        return (
            _addresses,
            _ages
        );
    }
}
