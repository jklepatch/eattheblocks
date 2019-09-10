pragma solidity ^0.5.2;

/**
 * DAO contract:
 * 1. Collects investors money (ether)
 * 2. Keep track of investor contributions with shares
 * 3. Allow investors to transfer shares
 * 4. allow investment proposals to be created and voted
 * 5. execute successful investment proposals (i.e send money)
 */

contract DAO {
  struct Proposal {
    uint id;
    string name;
    uint amount;
    address payable recipient;
    uint votes;
    uint end;
    bool executed;
  }

  mapping(address => bool) public investors;
  mapping(address => uint) public shares;
  mapping(address => mapping(uint => bool)) public votes;
  mapping(uint => Proposal) public proposals;
  uint public totalShares;
  uint public availableFunds;
  uint public contributionEnd;
  uint public nextProposalId;
  uint public voteTime;
  uint public quorum;
  address public admin;

  constructor(
    uint contributionTime, 
    uint _voteTime,
    uint _quorum) 
    public {
    require(_quorum > 0 && _quorum < 100, 'quorum must be between 0 and 100');
    contributionEnd = now + contributionTime;
    voteTime = _voteTime;
    quorum = _quorum;
    admin = msg.sender;
  }

  function contribute() payable external {
    require(now < contributionEnd, 'cannot contribute after contributionEnd');
    investors[msg.sender] = true;
    shares[msg.sender] += msg.value;
    totalShares += msg.value;
    availableFunds += msg.value;
  }

  function redeemShare(uint amount) external {
    require(shares[msg.sender] >= amount, 'not enough shares');
    require(availableFunds >= amount, 'not enough available funds');
    shares[msg.sender] -= amount;
    availableFunds -= amount;
    msg.sender.transfer(amount);
  }
    
  function transferShare(uint amount, address to) external {
    require(shares[msg.sender] >= amount, 'not enough shares');
    shares[msg.sender] -= amount;
    shares[to] += amount;
    investors[to] = true;
  }

  function createProposal(
    string memory name,
    uint amount,
    address payable recipient) 
    public 
    onlyInvestors() {
    require(availableFunds >= amount, 'amount too big');
    proposals[nextProposalId] = Proposal(
      nextProposalId,
      name,
      amount,
      recipient,
      0,
      now + voteTime,
      false
    );
    availableFunds -= amount;
    nextProposalId++;
  }

  function vote(uint proposalId) external onlyInvestors() {
    Proposal storage proposal = proposals[proposalId];
    require(votes[msg.sender][proposalId] == false, 'investor can only vote once for a proposal');
    require(now < proposal.end, 'can only vote until proposal end date');
    votes[msg.sender][proposalId] = true;
    proposal.votes += shares[msg.sender];
  }

  modifier onlyInvestors() {
     require(investors[msg.sender] == true, 'only investors');
     _;
  }
}
