pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Weth is ERC20 {
  constructor() ERC20('Wrapped Ether', 'WETH') {}

  function deposit(address to, uint amount) external payable {
    _mint(to, amount);
  }

  function withdraw(uint amount) external {
    require(balanceOf(msg.sender) >= amount, 'balance too low');
    _burn(msg.sender, amount);
    msg.sender.transfer(amount);
  }
}
