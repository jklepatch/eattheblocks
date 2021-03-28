pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './Airdrop.sol';

contract ETBToken is ERC20 {
  address public admin;
  address public airdrop;

  constructor() ERC20('Eat The Blocks Token', 'ETB') {
    admin = msg.sender;
    airdrop = address(new Airdrop(msg.sender));
  }

  function updateAdmin(address newAdmin) external {
    require(msg.sender == admin, 'only admin');
    admin = newAdmin;
  }

  function mint(address to, uint amount) external {
    require(msg.sender == admin || msg.sender == airdrop, 'only admin or airdrop');
    _mint(to, amount);
  }
}
