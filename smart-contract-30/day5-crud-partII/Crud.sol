pragma solidity ^0.5.0;

contract Crud {
  struct User {
    uint id;
    string name;
  }
  User[] public users;
  uint public nextId;

  function create(string memory name) public {
    users.push(User(nextId, name));
    nextId++;
  }

  function read(uint id) view public returns(uint, string memory) {
    for(uint i = 0; i < users.length; i++) {
      if(users[i].id == id) {
        return(users[i].id, users[i].name);
      }
    }
  }

  function update(uint id, string memory name) public {
    for(uint i = 0; i < users.length; i++) {
      if(users[i].id == id) {
        users[i].name = name;
      }
    }
  }

  function destroy(uint id) public {
    delete users[id];
  }
}
