pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract TimeLock {
  address public admin;
  uint public expiration;

  constructor() {
    admin = msg.sender;
  }

  function deposit(address _token, uint _amount, uint _duration) external {
    require(msg.sender == admin, 'only admin');
    require(expiration == 0, 'expiration already set');
    expiration = block.timestamp + _duration;
    IERC20(_token).transferFrom(msg.sender, address(this), _amount);
  }

  function withdraw(address _token) external {
    require(msg.sender == admin, 'only admin'); 
    require(block.timestamp >= expiration, 'too early');
    IERC20 token = IERC20(_token);
    uint balance = token.balanceOf(address(this)); 
    token.transfer(msg.sender, balance);
  }
}
