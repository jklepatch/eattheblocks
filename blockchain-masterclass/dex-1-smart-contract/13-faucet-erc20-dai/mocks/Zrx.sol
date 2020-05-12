pragma solidity 0.6.3;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20Detailed.sol';

contract Zrx is ERC20, ERC20Detailed {
  constructor() ERC20Detailed('ZRX', '0x token', 18) public {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}
