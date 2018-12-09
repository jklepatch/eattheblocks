pragma solidity ^0.5.0;

contract Crud {
  struct User {
    uint id;
    string name;
  }
  uint[] users;
  uint nextId;

  function create(string name) public {
    users.push(User(nextId, name));
    nextId++;
  }

  function read(uint id) view public returns(uint, string) {
    for(uint i = 0; i < users.length; i++) {
      if(users[i].id == id) {
        return(users[id].id, users[id].name);
      }
    }
  }

  function update(uint id, string name) public {
    for(uint i = 0; i < users.length; i++) {
      if(users[i].id == id) {
        users[id].name = name;
      }
    }
  }

  function destroy(uint id) public {
    delete users[id];
  }
}
