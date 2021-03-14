pragma solidity ^0.8.0;

import './TokenBase.sol';

contract TokenEth is TokenBase {
  constructor() TokenBase('ETH Token', 'ETK') {}
}
