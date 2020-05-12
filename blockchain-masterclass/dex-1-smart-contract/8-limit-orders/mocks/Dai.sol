pragma solidity 0.6.3;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20Detailed.sol';

contract Dai is ERC20, ERC20Detailed {
  constructor() ERC20Detailed('Dai', 'Dai Stablecoin', 18) public {}
}
