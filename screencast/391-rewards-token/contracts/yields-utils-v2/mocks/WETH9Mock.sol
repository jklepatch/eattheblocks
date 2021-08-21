// SPDX-License-Identifier: MIT
import "../token/ERC20.sol";

pragma solidity ^0.8.0;


contract WETH9Mock is ERC20 {
    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);

    constructor () ERC20("Wrapped Ether", "WETH", 18) { }

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        _balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint wad) public {
        require(_balanceOf[msg.sender] >= wad, "WETH9: Insufficient balance");
        _balanceOf[msg.sender] -= wad;
        payable(msg.sender).transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }

    function totalSupply() public view override returns (uint) {
        return address(this).balance;
    }
}