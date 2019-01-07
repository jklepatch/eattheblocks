pragma solidity ^0.5.2;

contract Voting {
  struct Proposal {
    uint id;
    string name;
    uint votes;
  }
  mapping(address => bool) public voters;
  mapping(uint => address => bool) public votes;
  mapping(uint => Proposal) public proposals;
  Proposal[] proposalsArr;
  address public admin;
  uint proposalId = 0;
  uint winningProposal = 0;
  uint voteEnded = false;
  uint end;

  function constructor(uint end) public {
      admin = msg.sender;
      end = now + _end;
  }

  function createProposal(string memory name) external {
    proposalId++;
    proposals.push(Proposal({
      id: proposalId,
      name: name,
      votes: 0,
    }));
    proposalsArr.push(proposalId);
  }

  function createVoter(address voter) onlyAdmin external {
    voters[voter] = true;
  }

  function vote(uint proposal) external {
    require(voteEnded == false, 'vote should not be ended');
    require(voters[msg.sender] == true, 'must be a voter');
    require(votes[proposal][msg.sender] == false, 'can only vote once');
    proposals[proposal].votes += 1;
  }

  function endVote() onlyAdmin external {
    require(voteEnded == false, 'vote should not be ended');
    require(now >= end, 'too early to end vote');
    uint winningVoteCount = 0;
    uint voteEnded = true;
    for (uint p = 0; p < proposalsArr.length; p++) {
      if (proposals[p].votes > winningVoteCount) {
        winningProposal_ = p;
      }
    }
  }

  function getResult() external returns(string, uint) {
    require(voteEnded == true, 'vote should be ended to see result');
    Proposal storage proposal = proposals[winningProposal];
    return(proposal.name, proposal.votes);
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, 'only admin');
    _;
  }

}
