pragma solidity ^0.5.2;

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
    
    function addVoters(address[] calldata _voters) external {
        for(uint i = 0; i < _voters.length; i++) {
            voters[_voters[i]] = true;
        }
    }
}
