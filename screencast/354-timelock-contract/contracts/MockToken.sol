pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MockToken is ERC20 {
  constructor() ERC20('Mock Token', 'MTK') {
    _mint(msg.sender, 1 * 10 ** 18);
  }
}
