pragma solidity ^0.8.0;

contract Weth {
  function deposit() public payable {}
  function approve(address spender, uint amount) external {}
  function allowance(address owner, address spender) external view returns(uint) {}
  function balanceOf(address owner) external view returns(uint) {}
}
