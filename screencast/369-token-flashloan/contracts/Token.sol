pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './IBorrower.sol';

contract Token is ERC20 {

  constructor() ERC20('My Token', 'TKN') {}

  function executeFlashloan(uint amount) external {
    _mint(msg.sender, amount);

    IBorrower(msg.sender).onExecuteFlashloan(address(this), amount);

    _burn(msg.sender, amount);
  }
}
