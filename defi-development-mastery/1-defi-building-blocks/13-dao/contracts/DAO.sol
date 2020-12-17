pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract DAO {
  enum Side { Yes, No }
  enum Status { Undecided, Approved, Rejected }
  struct Proposal {
    address author;
    bytes32 hash;
    uint createdAt;
    uint votesYes;
    uint votesNo;
    Status status;
  }

  mapping(bytes32 => Proposal) public proposals;
  mapping(address => mapping(bytes32 => bool)) public votes;
  mapping(address => uint) public shares;
  uint public totalShares;
  IERC20 public token;
  uint constant CREATE_PROPOSAL_MIN_SHARE = 1000 * 10 ** 18;
  uint constant VOTING_PERIOD = 7 days;

  constructor(address _token) {
    token = IERC20(_token);
  }

  function deposit(uint amount) external {
    shares[msg.sender] += amount;
    totalShares += amount;
    token.transferFrom(msg.sender, address(this), amount);
  }

  function withdraw(uint amount) external {
    require(shares[msg.sender] >= amount, 'not enough shares');
    shares[msg.sender] -= amount;
    totalShares -= amount;
    token.transfer(msg.sender, amount);
  }

  function createProposal(bytes32 proposalHash) external { 
    require(
      shares[msg.sender] >= CREATE_PROPOSAL_MIN_SHARE,
      'not enough shares to create proposal'
    );
    require(proposals[proposalHash].hash == bytes32(0), 'this proposal already exist');
    proposals[proposalHash] = Proposal(
      msg.sender,
      proposalHash,
      block.timestamp,
      0,
      0,
      Status.Undecided
    );
  }

  function vote(bytes32 proposalHash, Side side) external {
    Proposal storage proposal = proposals[proposalHash];
    require(votes[msg.sender][proposalHash] == false, 'already voted');
    require(proposals[proposalHash].hash != bytes32(0), 'proposal already exist'); 
    require(block.timestamp <= proposal.createdAt + VOTING_PERIOD, 'voting period over');
    votes[msg.sender][proposalHash] = true;
    if(side == Side.Yes) {
      proposal.votesYes += shares[msg.sender];
      if(proposal.votesYes * 100 / totalShares > 50) {
        proposal.status = Status.Approved;
      }
    } else {
      proposal.votesNo += shares[msg.sender];
      if(proposal.votesNo * 100 / totalShares > 50) {
        proposal.status = Status.Rejected;
      }
    }
  }
}
