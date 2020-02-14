pragma solidity ^0.5.0;

//With Remix
import 'https://github.com/gnosis/conditional-tokens-contracts/blob/master/contracts/ConditionalTokens.sol';

// With Truffle
//import '@gnosis.pm/conditional-tokens-contract/contracts/ConditionalTokens.sol';

contract Oracle {
  address admin;
  address myDefiProject;
  ConditionalTokens conditionalTokens;

  event NewBet(bytes32 questionId);

  constructor(address _myDefiProject, address _conditionalTokens) external {
    admin = msg.sender;
    myDefiProject = _myDefiProject;
    conditionalTokens = ConditionalTokens(_conditionalTokens);
  }

  function reportPayout(bytes32 questionId, uint[] calldata payouts) external {
    require(msg.sender == admin, 'only admin');
    conditionalTokens.reportPayouts(questionId, payouts);
  }

  function monitorBet(bytes32 questionId) external {
    require(msg.sender == myDefiProject, 'only myDefiProject');
    emit NewBet(questionId);
  }
}
