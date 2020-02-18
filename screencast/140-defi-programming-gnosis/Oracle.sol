pragma solidity ^0.5.0;

import './IConditionalTokens.sol';

contract Oracle {
  address admin;
  address myDefiProject;
  IConditionalTokens conditionalTokens;

  event NewBet(bytes32 questionId);

  constructor(address _myDefiProject, address _conditionalTokens) public {
    admin = msg.sender;
    myDefiProject = _myDefiProject;
    conditionalTokens = IConditionalTokens(_conditionalTokens);
  }

  function reportPayout(bytes32 questionId, uint[] calldata payouts) external {
    require(msg.sender == admin, 'only admin');
    conditionalTokens.reportPayouts(questionId, payouts);
  }

  function monitorOutcome(bytes32 questionId) external {
    require(msg.sender == myDefiProject, 'only myDefiProject');
    emit NewBet(questionId);
  }
}
