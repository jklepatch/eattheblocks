pragma solidity ^0.5.2;

contract LimitedWallet {
    event Deposit(address sender, uint amount);
    
    function deposit() payable external {
        uint balance = address(this).balance;
        require(balance + msg.value <= 1000, 'no more than 1000 wei allowed in wallet');
        emit Deposit(msg.sender, msg.value);
    }
    
    function balanceOf() view external returns(uint) {
        return address(this).balance;
    }
}
