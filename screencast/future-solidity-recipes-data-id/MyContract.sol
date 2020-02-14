pragma solidity ^0.5.14;

contract MyContract {
  //method 1
  struct User1 {
    uint id;
    string name;
  }
  User1[] users1;
  uint nextId;
  function createUser1(string calldata _name) external {
    users1.push(User1(nextId, _name));
    nextId++;
  }

  //method 2
  struct User2 {
    address userAddress;
    string name;
  }
  User2[] users2;
  function createUser2(string calldata _name) external {
    users2.push(User2(msg.sender, _name));
  }

  //method 3
  struct User3 {
    uint id;
    string name;
  }
  User3[] users3;
  function createUser3(
    uint _id,
    string calldata _name
  ) external {
    users3.push(User3(_id, _name));
  }

  //method 4
  struct User4 {
    bytes32 id;
    string name;
    uint age;
  }
  User4[] users4;
  function createUser4(
    uint _id,
    string calldata _name,
    uint _age 
  ) external {
    users4.push(User4(
      keccak256(abi.encodePacked(_name, _age)),
      _name,
      _age
    ));
  }
}
