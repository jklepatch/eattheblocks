pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract LpToken is ERC20 {
  constructor() ERC20('Lp Token', 'LTK') {} 
}
