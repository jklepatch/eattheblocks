pragma solidity ^0.5.0;

contract Event{
  uint public id;
  string public name;
  string public description;
  uint public start;
  uint public end;
  constructor(
    uint _id, 
    string memory _name, 
    string memory _description,
    uint _start,
    uint _end
  ) public {
    id = _id;
    name = _name;
    description = _description;
    start = _start;
    end = _end;
  }
}
