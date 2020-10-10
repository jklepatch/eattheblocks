pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MyToken1 is ERC20 { 
  constructor() ERC20('Token Name', 'TOKEN_SYMBOL') public {}
}

//with allocation in constructor
contract MyToken2 is ERC20 { 
  constructor() ERC20('Token Name', 'TOKEN_SYMBOL') {
    _mint(100000, msg.sender);
  }
}

//with allocation in mint() function
contract MyToken3 is ERC20 { 
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
contract MyToken4 is ERC20 { 
  constructor() ERC20('Token Name', 'TOKEN_SYMBOL') public {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}
