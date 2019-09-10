pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

contract Voting {
  mapping(address => bool) public voters;
  struct Choice {
    uint id;
    string name;
    uint votes;
  }
  struct Ballot {
    uint id;
    string name;
    Choice[] choices;
    uint end;
  }
  mapping(uint => Ballot) ballots;
  uint nextBallotId;
  address public admin;
  
  constructor() public {
    admin = msg.sender;
  }
  
  function addVoters(address[] calldata _voters) external onlyAdmin() {
    for(uint i = 0; i < _voters.length; i++) {
        voters[_voters[i]] = true;
    }
  }

  function createBallot(
    string memory name,
    string[] memory _choices,
    uint offset
    ) public onlyAdmin() {
      ballots[nextBallotId].id = nextBallotId;
      ballots[nextBallotId].name = name;
      ballots[nextBallotId].end = now + offset;
      for(uint i = 0; i < _choices.length ; i++) {
        ballots[nextBallotId].choices.push(Choice(i, _choices[i], 0));
      }
      nextBallotId++;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, 'only admin');
    _;
  }
}


