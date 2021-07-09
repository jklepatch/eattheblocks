pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract V2 is ERC20 {
  constructor() ERC20('Token V2', 'TV2') {
    _mint(msg.sender, 1000000);
  }

  function burn(uint amount) external {
    _burn(msg.sender, amount);
  }
}
