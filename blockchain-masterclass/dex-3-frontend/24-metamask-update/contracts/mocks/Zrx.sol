pragma solidity 0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Zrx is ERC20 {
  constructor() ERC20('ZRX', 'Zrx token') {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}
