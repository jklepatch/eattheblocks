pragma solidity ^0.7.2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract BonusToken is ERC20, Ownable {
  constructor() ERC20('Bonus Token', 'BTK') Ownable() {} 

  function mint(address to, uint amount) external onlyOwner() {
    _mint(to, amount);
  }
}
