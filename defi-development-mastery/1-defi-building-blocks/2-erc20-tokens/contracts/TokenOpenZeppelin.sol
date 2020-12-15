pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TokenOpenZeppelin1 is ERC20 { 
  constructor() ERC20('Token Name', 'TOKEN_SYMBOL') public {}
}

//with allocation in constructor
contract TokenOpenZeppelin2 is ERC20 { 
  constructor() ERC20('Token Name', 'TOKEN_SYMBOL') {
    _mint(msg.sender, 100000);
  }
}

//with allocation in mint() function
contract TokenOpenZeppelin3 is ERC20 { 
  address public admin;

  constructor() ERC20('Token Name', 'TOKEN_SYMBOL') public {
    admin = msg.sender;
  }

  function mint(address to, uint amount) external {
    require(msg.sender == admin, 'only admin');
    _mint(to, amount);
  }
}

//with faucet (good for testing)
contract TokenOpenZeppelin4 is ERC20 { 
  constructor() ERC20('Token Name', 'TOKEN_SYMBOL') public {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}
