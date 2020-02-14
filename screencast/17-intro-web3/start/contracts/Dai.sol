pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

contract Dai is ERC20, ERC20Detailed {
  constructor(
    string memory name,
    string memory symbol,
    uint8 decimals
  ) public ERC20Detailed(name, symbol, decimals) {}
}
