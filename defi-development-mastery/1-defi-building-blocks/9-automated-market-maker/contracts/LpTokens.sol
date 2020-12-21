pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract AutomatedMarketMaker is ERC20 {
  constructor() ERC20('Liquidity Tokens', 'LPT') {}
}
