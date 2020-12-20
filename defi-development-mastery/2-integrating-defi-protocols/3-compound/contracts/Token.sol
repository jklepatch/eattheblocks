pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
  constructor() ERC20('whatever', 'whatever') {}
}
