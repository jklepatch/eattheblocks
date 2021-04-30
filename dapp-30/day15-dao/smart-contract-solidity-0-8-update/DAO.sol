pragma solidity ^0.8.0;

/**
 * DAO contract:
 * 1. Collects investors money (ether) & allocate shares
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
    uint _quorum) {
    require(_quorum > 0 && _quorum < 100, 'quorum must be between 0 and 100');
    contributionEnd = block.timestamp + contributionTime;
    voteTime = _voteTime;
    quorum = _quorum;
    admin = msg.sender;
  }

  function contribute() payable external {
    require(block.timestamp < contributionEnd, 'cannot contribute after contributionEnd');
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
    payable(msg.sender).transfer(amount);
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
      block.timestamp + voteTime,
      false
    );
    availableFunds -= amount;
    nextProposalId++;
  }

  function vote(uint proposalId) external onlyInvestors() {
    Proposal storage proposal = proposals[proposalId];
    require(votes[msg.sender][proposalId] == false, 'investor can only vote once for a proposal');
    require(block.timestamp < proposal.end, 'can only vote until proposal end date');
    votes[msg.sender][proposalId] = true;
    proposal.votes += shares[msg.sender];
  }

  function executeProposal(uint proposalId) external onlyAdmin() {
    Proposal storage proposal = proposals[proposalId];
    require(block.timestamp >= proposal.end, 'cannot execute proposal before end date');
    require(proposal.executed == false, 'cannot execute proposal already executed');
    require((proposal.votes / totalShares) * 100 >= quorum, 'cannot execute proposal with votes # below quorum');
    _transferEther(proposal.amount, proposal.recipient);
  }

  function withdrawEther(uint amount, address payable to) external onlyAdmin() {
    _transferEther(amount, to);
  }
  
  function _transferEther(uint amount, address payable to) internal {
    require(amount <= availableFunds, 'not enough availableFunds');
    availableFunds -= amount;
    to.transfer(amount);
  }

  //For ether returns of proposal investments
  receive() external payable {
    availableFunds += msg.value;
  }

  modifier onlyInvestors() {
    require(investors[msg.sender] == true, 'only investors');
    _;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, 'only admin');
    _;
  }
}
