pragma solidity ^0.5.2;

contract CoreWallet {
    event Contribution(uint amount, uint date);
    function notifyContribution(uint amount) external {
        emit Contribution(amount, now);
        //Do other stuffs 
    }
}

contract LimitedWallet {
    event Deposit(address sender, uint amount);
    CoreWallet coreWallet;
    
    constructor() public {
        coreWallet = new CoreWallet();
    }
    
    function deposit() payable external {
        coreWallet.notifyContribution(msg.value);
        uint balance = address(this).balance;
        require(balance + msg.value <= 1000, 'no more than 1000 wei allowed in wallet');
        emit Deposit(msg.sender, msg.value);
    }
    
    function balanceOf() view external returns(uint) {
        return address(this).balance;
    }
}



