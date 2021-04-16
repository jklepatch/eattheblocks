pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ETBToken is ERC20 {
  constructor() ERC20('Eat The Blocks Token', 'ETB') {
    _mint(msg.sender, 1000000 * 10 ** 18);
  }
}
