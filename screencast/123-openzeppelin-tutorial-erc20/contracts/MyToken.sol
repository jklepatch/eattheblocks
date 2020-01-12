pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Capped.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol';

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';


contract MyToken2 is SafeERC20 { }

contract MyToken is ERC20, ERC20Detailed, ERC20Burnable, ERC20Mintable, ERC20Capped, ERC20Pausable {
  constructor() ERC20Detailed("MyToken", "MTN", 18) ERC20Capped(1000);

  function foo() external {
    IERC20(0x.....).transfer(), etc...
  }
}

