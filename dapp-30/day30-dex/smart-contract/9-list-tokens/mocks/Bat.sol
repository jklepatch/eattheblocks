pragma solidity 0.6.3;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20Detailed.sol';

contract Bat is ERC20, ERC20Detailed {
  constructor() ERC20Detailed('BAT', 'Brave browser token', 18) public {}
}
