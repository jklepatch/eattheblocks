pragma solidity ^0.5.4;

contract StateMachine {
    enum State {
        PENDING,
        ACTIVE,
        CLOSED
    }
    State public state = State.PENDING;
    uint public amount;
    uint public interest;
    uint public end;
    address payable public borrower;
    address payable public lender;
    
    constructor(
        uint _amount,
        uint _interest,
        uint _duration,
        address payable _borrower,
        address payable _lender
        ) public {
        amount = _amount;
        interest = _interest;
        end = now + _duration;
        borrower = _borrower;
        lender = _lender;
    }
    
    function fund() payable external {
        require(msg.sender == lender, 'only lender can lend');
        require(address(this).balance == amount, 'can only lend the exact amount');
        borrower.transfer(amount);
    }
    
    function reimburse() payable external {
        require(msg.sender == borrower, 'only borrower can reimburse');
        require(msg.value == amount + interest, 'borrower need to reimburse exactly amount + interest');
        lender.transfer(amount + interest);
    }
}
